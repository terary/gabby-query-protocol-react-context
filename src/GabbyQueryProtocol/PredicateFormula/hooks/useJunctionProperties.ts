/* eslint-disable import/prefer-default-export */
import React from "react";
import type {
  TPredicatePropertiesJunction,
  TPredicateProperties,
} from "gabby-query-protocol-lib";

// import { GQPPredicateEditorContext, TGQPPredicateEditorContextType } from "../context";
import { PredicateFormulaEditorContext } from "../context";
import type { TPredicateFormulaEditorContextType } from "../context";
export const useJunctionProperties = (predicateId: string) => {
  const {
    appendPredicate,
    getChildrenIds,
    operatorLabels,
    getJunctionById,
    getPredicateById,
    makeEmptyPredicate,
    isBranchNode,
    isRoot,
    removePredicate,
    setConjunction: setNodeConjunction,
    setDisjunction: setNodeDisjunction,
  } = React.useContext(
    PredicateFormulaEditorContext.context
  ) as TPredicateFormulaEditorContextType;
  //
  return {
    // queryPredicate:  getJunctionById(nodeId) as TPredicatePropertiesJunction,

    appendPredicate: (newPredicate: TPredicateProperties) => {
      appendPredicate(predicateId, newPredicate);
    },

    getChildrenIds: () => {
      return getChildrenIds(predicateId);
    },

    getPredicateProperties: (): TPredicatePropertiesJunction => {
      // *tmc* debug
      return getJunctionById(predicateId);
    },
    isBranch: isBranchNode(predicateId),
    isRoot: isRoot(predicateId),
    makeEmptyPredicate,

    operatorLabels,

    removeMe: () => {
      removePredicate(predicateId);
    },
    removePredicateJunction: () => {
      removePredicate(predicateId);
    },

    setConjunction: () => {
      // untestable
      // tests gives: "Maximum update depth exceeded"
      // doesn't seem to be an issue when running in dev/prod.
      // not sure why tests do it
      setNodeConjunction(predicateId);
    },

    setDisjunction: () => {
      // untestable
      // tests gives: "Maximum update depth exceeded"
      // doesn't seem to be an issue when running in dev/prod.
      // not sure why tests do it
      setNodeDisjunction(predicateId);
    },
    /// *************************************************
    // getChildrenIds: () => {
    //   return getChildrenIds(predicateId);
    // },
    getChildIdsOf: (predicateId: string) => {
      return getChildrenIds(predicateId);
    },
    isBranchNode: isBranchNode(predicateId),
    getPredicateById,
  };
};
