/* eslint-disable import/prefer-default-export */
import React from "react";
import type {
  TPredicatePropertiesJunction,
  TPredicateProperties,
  TPredicateNode,
} from "gabby-query-protocol-lib";

import { PredicateFormulaEditorContext } from "../context";
import type { TPredicateFormulaEditorContextType } from "../context";

export interface IUseJunctionProperties {
  appendPredicate: (newPredicate: TPredicateProperties) => string;
  getChildrenIds: () => string[];
  getChildIdsOf: (predicateId: string) => string[];
  getJunctionProperties: () => TPredicatePropertiesJunction;
  getPredicateById: (predicateId: string) => TPredicateNode | null;
  isBranchNode: boolean;
  isRoot: boolean;
  removeCurrentPredicateJunction: () => void;
  setConjunction: () => void;
  setDisjunction: () => void;
}

export const useJunctionProperties = (predicateId: string): IUseJunctionProperties => {
  const {
    appendPredicate,
    getChildrenIds,
    getJunctionById,
    getPredicateById,
    isBranchNode,
    isRoot,
    removePredicate,
    setConjunction: setNodeConjunction,
    setDisjunction: setNodeDisjunction,
  } = React.useContext(
    PredicateFormulaEditorContext.context
  ) as TPredicateFormulaEditorContextType;

  if (!isBranchNode(predicateId)) {
    throw new Error("Tried useJunctionProperties on non junction/branch node");
  }

  return {
    appendPredicate: (newPredicate: TPredicateProperties) => {
      return appendPredicate(predicateId, newPredicate);
    },

    getChildrenIds: () => {
      return getChildrenIds(predicateId);
    },
    getChildIdsOf: (predicateId: string) => {
      return getChildrenIds(predicateId);
    },

    getJunctionProperties: (): TPredicatePropertiesJunction => {
      // does throw
      return getJunctionById(predicateId);
    },
    getPredicateById, // utility function. getSomeOtherPredicateById(predicateId) may be better name

    isBranchNode: isBranchNode(predicateId),
    isRoot: isRoot(predicateId),

    removeCurrentPredicateJunction: () => {
      removePredicate(predicateId);
    },

    setConjunction: () => {
      setNodeConjunction(predicateId);
    },

    setDisjunction: () => {
      setNodeDisjunction(predicateId);
    },
  };
};
