/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import type {
  TPredicateProperties,
  TPredicateOperator,
  TPredicatePropertiesArrayValue,
  TPredicateSubjectWithId,
  TGabbyQueryProtocolContextType,
} from "../../lib";

import InputGeneric from "./InputGeneric";
import SelectGeneric from "./SelectGeneric";
import SelectMultipleGeneric from "./SelectMultipleGeneric";
import { GabbyQueryProtocolContext } from "../../lib";

const noop = (...args: unknown[]) => {
  // console.log("PredicateBuilder noop called");
  // console.dir(args);
};

const emptyPredicate = (
  subject: TPredicateSubjectWithId
): TPredicateProperties | TPredicatePropertiesArrayValue => {
  const { subjectId, validOperators } = { ...subject };

  if (subjectId === undefined || validOperators === undefined) {
    return {} as TPredicateProperties;
  }

  const operator = Object.keys(validOperators).shift();

  return {
    value: "",
    subjectId,
    operator,
  } as TPredicateProperties;
};

interface PredicateEditorProps {
  // readonly querySubject: TQuerySubjectWithId;
  subjectId: string;
  initialPredicate?: TPredicateProperties | TPredicatePropertiesArrayValue;
  onFinish?: (predicate: TPredicateProperties) => void;
  onCancel?: () => void;
}
export const PredicateEditor = ({
  initialPredicate = {} as TPredicateProperties | TPredicatePropertiesArrayValue,
  subjectId,
  onFinish = noop,
  onCancel = noop,
}: PredicateEditorProps): JSX.Element => {
  const { subjectDictionary, operatorLabels } = React.useContext(
    GabbyQueryProtocolContext
  ) as TGabbyQueryProtocolContextType;

  const querySubject = subjectDictionary.getSubject(subjectId);

  const [currenTPredicateProperties, setCurrenTPredicateProperties] = useState({
    ...emptyPredicate(querySubject),
    ...initialPredicate,
  } as TPredicateProperties | TPredicatePropertiesArrayValue);

  const optionLists = subjectDictionary.getOptionsList(subjectId);

  useEffect(() => {
    setCurrenTPredicateProperties({
      ...emptyPredicate(querySubject),
      ...initialPredicate,
    });
  }, [subjectId]);

  const handleOperatorChange = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    const newPredicate = {
      ...currenTPredicateProperties,
      ...{ operator: ev.target.value as TPredicateOperator },
    };
    setCurrenTPredicateProperties(newPredicate);
  };

  const handleMultiValueChange = (newValue: (string | number)[]) => {
    setCurrenTPredicateProperties({
      ...currenTPredicateProperties,
      ...{ value: newValue },
    } as TPredicatePropertiesArrayValue);
  };
  const handleValueChange = (newValue: string | number) => {
    setCurrenTPredicateProperties({
      ...currenTPredicateProperties,
      ...{ value: newValue },
    });
  };

  const Operators = () => {
    return (
      <>
        <select
          value={currenTPredicateProperties.operator}
          onChange={handleOperatorChange}
        >
          {Object.keys(querySubject.validOperators).map((op) => {
            return (
              <option value={op} key={op}>
                {operatorLabels[op as TPredicateOperator]}({op})
              </option>
            );
          })}
        </select>
      </>
    );
  };

  const handleFinish = () => {
    onFinish(currenTPredicateProperties);
  };

  const isSelectOperator = () => {
    return (
      currenTPredicateProperties.operator === "$nanyOf" ||
      currenTPredicateProperties.operator === "$anyOf" ||
      currenTPredicateProperties.operator === "$oneOf"
    );
  };

  const isMultiSelect = () => {
    return ["$nanyOf", "$anyOf"].includes(currenTPredicateProperties.operator);
  };
  return (
    <>
      <Operators />
      {isSelectOperator() && isMultiSelect() && (
        <SelectMultipleGeneric
          options={
            optionLists[
              currenTPredicateProperties.operator as "$nanyOf" | "$anyOf" | "$oneOf"
            ]
          }
          value={currenTPredicateProperties.value}
          onChange={handleMultiValueChange}
        />
      )}
      {isSelectOperator() && !isMultiSelect() && (
        <SelectGeneric
          options={
            optionLists[
              currenTPredicateProperties.operator as "$nanyOf" | "$anyOf" | "$oneOf"
            ]
          }
          value={currenTPredicateProperties.value}
          onChange={handleValueChange}
        />
      )}

      {!isSelectOperator() && (
        <InputGeneric
          value={currenTPredicateProperties.value}
          onChange={handleValueChange}
        />
      )}

      <button onClick={handleFinish} type="button">
        <span style={{ color: "green" }}>&#10004;</span>
      </button>
      <button onClick={onCancel} type="button">
        <span style={{ color: "red" }}>&#10006;</span>
      </button>
    </>
  );
};
