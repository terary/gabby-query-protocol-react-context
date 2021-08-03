/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import type {
  TQueryPredicate,
  TPredicateOperator,
  TQueryPredicateArrayValue,
  TQuerySubjectWithId,
} from "gabby-query-protocol-lib";
import type { TGabbyQueryProtocolContextType } from "../../lib/GabbyQueryProtocolContext";

import InputGeneric from "./InputGeneric";
import SelectGeneric from "./SelectGeneric";
import SelectMultipleGeneric from "./SelectMultipleGeneric";
// import { GabbyQueryProtocolContext } from "../../lib/GabbyQueryProtocolContext";
import { GabbyQueryProtocolContext } from "../../lib/GabbyQueryProtocolContext";

const noop = (...args: unknown[]) => {
  // console.log("PredicateBuilder noop called");
  // console.dir(args);
};

const emptyPredicate = (
  subject: TQuerySubjectWithId
): TQueryPredicate | TQueryPredicateArrayValue => {
  const { subjectId, validOperators } = { ...subject };

  if (subjectId === undefined || validOperators === undefined) {
    return {} as TQueryPredicate;
  }

  const operator = Object.keys(validOperators).shift();

  return {
    value: "",
    subjectId,
    operator,
  } as TQueryPredicate;
};

interface PredicateEditorProps {
  // readonly querySubject: TQuerySubjectWithId;
  subjectId: string;
  initialPredicate?: TQueryPredicate | TQueryPredicateArrayValue;
  onFinish?: (predicate: TQueryPredicate) => void;
  onCancel?: () => void;
}
export const PredicateEditor = ({
  initialPredicate = {} as TQueryPredicate | TQueryPredicateArrayValue,
  subjectId,
  onFinish = noop,
  onCancel = noop,
}: PredicateEditorProps): JSX.Element => {
  const { subjectDictionary, operatorLabels } = React.useContext(
    GabbyQueryProtocolContext
  ) as TGabbyQueryProtocolContextType;

  const querySubject = subjectDictionary.getSubject(subjectId);

  const [currentPredicate, setCurrentPredicate] = useState({
    ...emptyPredicate(querySubject),
    ...initialPredicate,
  } as TQueryPredicate | TQueryPredicateArrayValue);

  const optionLists = subjectDictionary.getOptionsList(subjectId);

  useEffect(() => {
    setCurrentPredicate({
      ...emptyPredicate(querySubject),
      ...initialPredicate,
    });
  }, [subjectId]);

  const handleOperatorChange = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newPredicate = {
      ...currentPredicate,
      ...{ operator: ev.target.value as TPredicateOperator },
    };
    setCurrentPredicate(newPredicate);
  };

  const handleMultiValueChange = (newValue: (string | number)[]) => {
    setCurrentPredicate({
      ...currentPredicate,
      ...{ value: newValue },
    } as TQueryPredicateArrayValue);
  };
  const handleValueChange = (newValue: string | number) => {
    setCurrentPredicate({
      ...currentPredicate,
      ...{ value: newValue },
    });
  };

  const Operators = () => {
    return (
      <>
        <select
          value={currentPredicate.operator}
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
    onFinish(currentPredicate);
  };

  const isSelectOperator = () => {
    return (
      currentPredicate.operator === "$anyOf" ||
      currentPredicate.operator === "$oneOf"
    );
  };

  const isMultiSelect = () => {
    return currentPredicate.operator === "$anyOf";
  };
  return (
    <>
      <Operators />
      {isSelectOperator() && isMultiSelect() && (
        <SelectMultipleGeneric
          options={
            optionLists[currentPredicate.operator as "$anyOf" | "$oneOf"]
          }
          value={currentPredicate.value}
          onChange={handleMultiValueChange}
        />
      )}
      {isSelectOperator() && !isMultiSelect() && (
        <SelectGeneric
          options={
            optionLists[currentPredicate.operator as "$anyOf" | "$oneOf"]
          }
          value={currentPredicate.value}
          onChange={handleValueChange}
        />
      )}

      {!isSelectOperator() && (
        <InputGeneric
          value={currentPredicate.value}
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
