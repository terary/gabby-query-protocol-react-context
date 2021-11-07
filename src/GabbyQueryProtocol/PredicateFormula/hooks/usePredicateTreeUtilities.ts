/* eslint-disable import/prefer-default-export */
import React from "react";
import { GQPPredicateEditorContext } from "../context";
import type { TGQPPredicateEditorContextType } from "../context";
import type {
  TPredicateOperator,
  TValidOperatorList,
  TValueLabelList,
  TOperatorOptions,
} from "gabby-query-protocol-lib";

export const usePredicateTreeUtilities = () => {
  const { getPredicateTreeAsJson, operatorLabels, subjectDictionary } = React.useContext(
    GQPPredicateEditorContext
  ) as TGQPPredicateEditorContextType;

  return {
    something: () => {
      subjectDictionary.getSubject("a");
      subjectDictionary.getOptionsList("a");
    },
    getPredicateTreeAsJson,
    getSubjectById: (subjectId: string) => subjectDictionary.getSubject(subjectId),
    operatorLabels,
    subjectDictionary,

    // helper function to pull valid options given subjectId and operator
    // example usage: getSelectOptions('subjectId', '$anyOf') -> [validOption1, validOption2, ...]
    // returns valid options or empty array if no valid options.
    getSelectOptions: (subjectId: string, operator: TPredicateOperator) => {
      // TODO - this could be (TPredicateProperties)=>...
      const subject = subjectDictionary.getSubject(subjectId);
      const { validOperators } = subject;

      const operatorOptions = validOperators[operator] as TOperatorOptions;

      let optionList: TValueLabelList = [];
      if (Array.isArray(operatorOptions.optionList)) {
        optionList = operatorOptions.optionList;
      }
      return optionList;
    },
  };
};
