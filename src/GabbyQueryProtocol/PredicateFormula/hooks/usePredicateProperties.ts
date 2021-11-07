/* eslint-disable import/prefer-default-export */
import React from "react";
import type {
  TOperatorOptions,
  TPredicateProperties,
  TValidatorResponse,
  TValueLabelList,
  TPredicatePropertiesArrayValue,
} from "gabby-query-protocol-lib";

import { Validators } from "gabby-query-protocol-lib";
import { GQPPredicateEditorContext } from "../context";
import type { TGQPPredicateEditorContextType } from "../context";

/**
 * "NodeId" sometimes referred to as predicateId.
 * The difference is context. Predicates have no ID. Nodes can be ID'd
 * the tree structure. nodeId can uniquely identify a predicate.
 *
 * @param nodeId - key to retrieve node,
 * @returns
 */
export const usePredicateProperties = (nodeId: string) => {
  const {
    appendPredicate,
    getLeafIdsAll,
    getPredicateById,
    getPredicateLeafById,
    isRoot,
    makeEmptyPredicate,
    operatorLabels,
    removePredicate,
    updatePredicate,
    subjectDictionary,
  } = React.useContext(GQPPredicateEditorContext) as TGQPPredicateEditorContextType;

  return {
    appendPredicate: (newPredicate: TPredicateProperties) => {
      appendPredicate(nodeId, newPredicate);
    },
    getLeafIdsAll,
    getPredicateLeafProperties: () => {
      const predicateProperties = getPredicateLeafById(nodeId);
      const subjectProperties = subjectDictionary.getSubject(predicateProperties.subjectId);

      return { subjectProperties, predicateProperties };
    },
    isRoot: isRoot(nodeId),
    makeEmptyPredicate,
    operatorLabels,
    queryPredicate: getPredicateById(nodeId) as TPredicateProperties, // maybe obsolete
    removeMe: () => {
      removePredicate(nodeId);
    },
    removeCurrentPredicate: () => {
      removePredicate(nodeId);
    },
    subjectDictionary,
    updateMe: (change: TPredicateProperties | TPredicatePropertiesArrayValue) => {
      updatePredicate(nodeId, change);
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
