/* eslint-disable import/prefer-default-export */
import React from "react";
// import { GQPPredicateEditorContext } from "../context";
// import type { TGQPPredicateEditorContextType } from "../context";
import { PredicateFormulaEditorContext } from "../context";
import type { TPredicateFormulaEditorContextType } from "../context";
import type { TPredicateOperatorLabels } from "../type";

import type {
  IPredicateSubjectDictionary,
  TPredicateOperator,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
  TSerializedPredicateTree,
  TPredicateSubjectWithId,
  TValidOperatorList,
  TValueLabelList,
  TOperatorOptions,
} from "gabby-query-protocol-lib";

export interface IUsePredicateTreeUtilities {
  getChildrenIds: (predicateId: string) => string[];
  getPredicateTreeAsJson: () => TSerializedPredicateTree;
  getSubjectById: (subjectId: string) => TPredicateSubjectWithId;
  operatorLabels: TPredicateOperatorLabels;
  subjectDictionary: IPredicateSubjectDictionary;
  testIsBranchNode: (predicateId: string) => boolean;
  getSelectOptions: (subjectId: string, operator: TPredicateOperator) => TValueLabelList;
  makeEmptyPredicate: () => TPredicateProperties | TPredicatePropertiesArrayValue;
}

export const usePredicateTreeUtilities = (): IUsePredicateTreeUtilities => {
  const {
    getChildrenIds,
    getPredicateTreeAsJson,
    isBranchNode,
    makeEmptyPredicate,
    operatorLabels,
    subjectDictionary,
  } = React.useContext(
    PredicateFormulaEditorContext.context
  ) as TPredicateFormulaEditorContextType;

  return {
    // something: () => {
    //   subjectDictionary.getSubject("a");
    //   subjectDictionary.getOptionsList("a");
    // },
    getChildrenIds,
    getPredicateTreeAsJson,
    getSubjectById: (subjectId: string) => subjectDictionary.getSubject(subjectId),
    operatorLabels,
    subjectDictionary,
    testIsBranchNode: (predicateId: string) => isBranchNode(predicateId),
    makeEmptyPredicate,
    // helper function to pull valid options given subjectId and operator
    // example usage: getSelectOptions('subjectId', '$anyOf') -> [validOption1, validOption2, ...]
    // returns valid options or empty array if no valid options.
    // TODO *tmc* this needs to be renamed to something relevant to labelVale - not options
    getSelectOptions: (subjectId: string, operator: TPredicateOperator) => {
      // TODO - this could be (TPredicateProperties)=>...
      const subject = subjectDictionary.getSubject(subjectId);
      const { validOperators } = subject;

      const operatorOptions = validOperators[operator] as TOperatorOptions;

      if (operatorOptions === undefined) {
        return [];
      }

      let optionList: TValueLabelList = [];
      if (Array.isArray(operatorOptions.optionList)) {
        optionList = operatorOptions.optionList;
      }
      return optionList;
    },
  };
};
