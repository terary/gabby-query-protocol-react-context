/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */

import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/system";
import { GridSize } from "@mui/material";
import Grid from "@mui/material/Grid";
import type {
  TPredicateOperator,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
  TPredicateSubjectProperties,
  TPredicateSubjectWithId,
  TValidatorResponse,
  TValidOperatorList,
} from "gabby-query-protocol-lib";
import { ButtonsFinishCancelText } from "../common/ButtonsFinishCancelText";
import { ButtonsFinishCancelIcon } from "../common/ButtonsFinishCancelIcon";
import { InputMux } from "./InputMux";
// import { usePredicateTreeUtilities } from "../../GabbyQueryProtocol/PredicateFormula";
import { PredicateFormulaEditorContextHooks } from "../../GabbyQueryProtocol";

import { Validators } from "gabby-query-protocol-lib";
import type {
  TPredicateNodeJson,
  IPredicateSubjectDictionary,
} from "gabby-query-protocol-lib";
const { usePredicateTreeUtilities } = PredicateFormulaEditorContextHooks;

export interface IValidatePredicateAgainstOperator {
  (
    predicateJson: TPredicateNodeJson,
    subjects: IPredicateSubjectDictionary
  ): TValidatorResponse;
}

// TODO - *tmc* - this should be exported/imported from package somewhere?
type ValueType = number | string | (number | string)[]; // do not export.  If export is necessary change name T... (no "Type"), the convention

const getFirstValidOperator = (validOperators: TValidOperatorList): TPredicateOperator => {
  return Object.keys(validOperators)[0] as TPredicateOperator;
};

const breakpoints = {
  "1row": {
    subject: 3 as GridSize,
    operator: 3 as GridSize,
    value: 5 as GridSize,
    controlButtons: 1 as GridSize,
  },
  "2row": {
    subject: 6 as GridSize,
    operator: 6 as GridSize,
    value: 10 as GridSize,
    controlButtons: 2 as GridSize,
  },
  "3row": {
    subject: 12 as GridSize,
    operator: 12 as GridSize,
    value: 12 as GridSize,
    controlButtons: 12 as GridSize,
  },
};

const noOpValidator = (
  predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
): TValidatorResponse => {
  return { hasError: false, errorMessages: [] };
};

const noopTestSpyPredicateOnChange = (
  predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
): void => {};

interface Props {
  layout?: "1row" | "2row" | "3row";
  initialPredicate: TPredicateProperties | TPredicatePropertiesArrayValue;
  onCancel: () => void;
  onFinish: (
    predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
  ) => void;
  testSpyPredicateOnChange?: (
    predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
  ) => void;

  validator?: IValidatePredicateAgainstOperator;
  // validator?: (
  //   predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
  // ) => TValidatorResponse;
}

export const PredicateEditor = ({
  layout = "1row",
  initialPredicate,
  onCancel,
  onFinish,
  testSpyPredicateOnChange = noopTestSpyPredicateOnChange,
  validator = Validators.ValidatePredicateAgainstOperator,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { subjectDictionary, operatorLabels } = usePredicateTreeUtilities();

  const [userMessage, setUserMessage] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = React.useState<TPredicateSubjectWithId>(
    subjectDictionary.getSubject(initialPredicate.subjectId)
  );

  const [predicateExpression, setPredicateExpression] = React.useState<
    TPredicateProperties | TPredicatePropertiesArrayValue
  >(initialPredicate);

  const _updatePredicateState = (
    newPredicate: TPredicateProperties | TPredicatePropertiesArrayValue
  ) => {
    testSpyPredicateOnChange(newPredicate);
    setPredicateExpression(newPredicate);
  };

  const handleSelectedSubjectChange = (event: SelectChangeEvent) => {
    const subjectId = event.target.value as string;
    const subjectProps = subjectDictionary.getSubject(subjectId);

    const operator = getFirstValidOperator(subjectProps.validOperators);
    const newPredicate = { subjectId, operator, value: "" };

    _updatePredicateState(newPredicate);

    setSelectedSubject(subjectProps);
  };

  const handleOperatorChange = (event: SelectChangeEvent) => {
    const operator = event.target.value as TPredicateOperator;
    _updatePredicateState({ ...predicateExpression, operator, value: "" });
  };

  const handleValueChange = (value: ValueType) => {
    const pExpression = { ...predicateExpression };

    //@ts-ignore - there seems to be an issue with the way value is typed.
    // should be resolved in future releases
    pExpression.value = value;
    // setPredicateExpression(pExpression);
    _updatePredicateState(pExpression);
  };

  const handleFinishClick = () => {
    const subject = subjectDictionary.getSubject(
      predicateExpression.subjectId
    ) as TPredicateSubjectProperties;

    // TODO - *tmc* - this cast should not be required.  Issue is with validator
    if (subject.datatype === "integer") {
      predicateExpression.value = Number(predicateExpression.value);
    }
    const validatorResponse = validator(predicateExpression, subjectDictionary);
    if (validatorResponse.hasError) {
      console.log("Validation Debug:", validatorResponse.errorMessages);
      setUserMessage("Failed validation check console for more information");
    } else {
      setUserMessage(null);
      onFinish(predicateExpression);
    }
  };

  const SubjectSelectFormControl = () => {
    return (
      <FormControl variant="outlined" sx={{ width: "100%" }}>
        <InputLabel htmlFor="editor-select-subject">Subject</InputLabel>
        <Select
          inputProps={{
            name: "subjectId",
            id: "editor-select-subject",
            "data-testid": "test-subject-select",
          }}
          label="Subject"
          native
          onChange={handleSelectedSubjectChange}
          value={selectedSubject.subjectId}
        >
          {subjectDictionary.getSubjectIds().map((subjectId) => {
            const subject = subjectDictionary.getSubject(subjectId);
            return (
              <option key={subjectId} value={subjectId}>
                {subject.defaultLabel || subjectId}
              </option>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const OperatorSelectFormControl = () => {
    return (
      <FormControl variant="outlined" sx={{ width: "100%" }}>
        <InputLabel htmlFor="editor-select-operator">Operator</InputLabel>
        <Select
          native
          value={predicateExpression.operator}
          onChange={handleOperatorChange}
          label="Operator"
          inputProps={{
            name: "operator",
            id: "editor-select-operator",
          }}
        >
          {Object.entries(selectedSubject.validOperators).map(([op, operatorAttributes]) => {
            return (
              <option key={op} value={op}>
                {operatorLabels[op as TPredicateOperator]}
              </option>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={breakpoints[layout].subject}>
        <SubjectSelectFormControl />
      </Grid>
      <Grid item xs={12} md={breakpoints[layout].operator}>
        <OperatorSelectFormControl />
      </Grid>
      <Grid item xs={12} md={breakpoints[layout].value} style={{ textAlign: "left" }}>
        <InputMux
          id="mux-id"
          name="mux-name"
          predicate={predicateExpression}
          onChange={handleValueChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={breakpoints[layout].controlButtons}
        style={{ textAlign: "center" }}
      >
        {layout === "1row" && (
          <ButtonsFinishCancelIcon onFinish={handleFinishClick} onCancel={onCancel} />
        )}
        {layout === "2row" && (
          <ButtonsFinishCancelIcon onFinish={handleFinishClick} onCancel={onCancel} />
        )}
        {layout === "3row" && (
          <ButtonsFinishCancelText onFinish={handleFinishClick} onCancel={onCancel} />
        )}
      </Grid>
      {userMessage !== null && (
        <Grid
          item
          xs={12}
          alignContent="center"
          textAlign="center"
          style={{
            color: theme.palette.error.main,
            marginLeft: "15px",
            marginRight: "15px",
          }}
        >
          {userMessage}
        </Grid>
      )}
    </Grid>
  );
};
