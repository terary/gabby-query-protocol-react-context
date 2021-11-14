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
import { TPredicatePropertiesGeneric } from "../type";

export interface IUsePredicateProperties {
  appendPredicate: (newPredicate: TPredicatePropertiesGeneric) => string;
  getPredicateById: (predicateId: string) => TPredicateNode | null;
  getPredicateLeafProperties: () => {
    predicateProperties: TPredicatePropertiesGeneric;
    subjectProperties: TPredicateSubjectWithId;
  };
  isRoot: boolean;
  removeCurrentPredicate: () => void;
  updateCurrentPredicate: (changes: TPredicatePropertiesGeneric) => void; // will throw?
  validatePredicateProperties: (
    predicateProperties: TPredicatePropertiesGeneric
  ) => TValidatorResponse;
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
    appendPredicate: (newPredicate: TPredicatePropertiesGeneric) => {
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

    updateCurrentPredicate: (changes: TPredicatePropertiesGeneric) => {
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
