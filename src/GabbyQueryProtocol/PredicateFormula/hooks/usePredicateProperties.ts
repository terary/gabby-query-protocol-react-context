/* eslint-disable import/prefer-default-export */
import React from "react";
import type {
  TPredicateNode,
  TPredicateProperties,
  TValidatorResponse,
  TPredicatePropertiesArrayValue,
  TPredicateSubjectWithId,
} from "gabby-query-protocol-lib";

import { Validators } from "gabby-query-protocol-lib";
import { PredicateFormulaEditorContext } from "../context";
import type { TPredicateFormulaEditorContextType } from "../context";

type PredicateItemType = TPredicateProperties | TPredicatePropertiesArrayValue;

export interface IUsePredicateProperties {
  appendPredicate: (newPredicate: PredicateItemType) => string;
  getPredicateById: (predicateId: string) => TPredicateNode | null;
  getPredicateLeafProperties: () => {
    predicateProperties: PredicateItemType;
    subjectProperties: TPredicateSubjectWithId;
  };
  isRoot: boolean;
  removeCurrentPredicate: () => void;
  updateCurrentPredicate: (changes: PredicateItemType) => void; // will throw?
  validatePredicateProperties: (predicateProperties: PredicateItemType) => TValidatorResponse;
}
export const usePredicateProperties = (predicateId: string): IUsePredicateProperties => {
  const {
    appendPredicate,
    getPredicateById,
    getPredicateLeafById,
    isRoot,
    removePredicate,
    updatePredicate,
    subjectDictionary,
  } = React.useContext(
    PredicateFormulaEditorContext.context
  ) as TPredicateFormulaEditorContextType;

  return {
    appendPredicate: (newPredicate: TPredicateProperties) => {
      return appendPredicate(predicateId, newPredicate);
    },

    getPredicateLeafProperties: () => {
      const predicateProperties = getPredicateLeafById(predicateId);
      const subjectProperties = subjectDictionary.getSubject(predicateProperties.subjectId);

      return { predicateProperties, subjectProperties };
    },

    getPredicateById,

    isRoot: isRoot(predicateId),

    removeCurrentPredicate: () => {
      removePredicate(predicateId);
    },

    updateCurrentPredicate: (changes: PredicateItemType) => {
      updatePredicate(predicateId, changes);
    },

    validatePredicateProperties: (
      predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
    ): TValidatorResponse => {
      return Validators.ValidatePredicateAgainstOperator(
        predicateProperties,
        subjectDictionary
      );
    },
  };
};
