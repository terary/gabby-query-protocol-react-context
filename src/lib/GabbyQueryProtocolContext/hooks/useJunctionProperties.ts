/* eslint-disable import/prefer-default-export */
import React from "react";
import type {
  TQueryPredicateJunction,
  TQueryPredicate,
} from "gabby-query-protocol-lib";
import { GabbyQueryProtocolContext, TGabbyQueryProtocolContextType } from "../context";

export const useJunctionProperties = (nodeId: string) => {
  const {
    appendPredicate,
    getChildrenIds,
    getPredicateById,
    makeEmptyPredicate,
    removePredicate,
    setConjunction,
    setDisjunction,
  } = React.useContext(GabbyQueryProtocolContext) as TGabbyQueryProtocolContextType;
  return {
    queryPredicate: getPredicateById(nodeId) as TQueryPredicateJunction,
    appendPredicate: (newPredicate: TQueryPredicate) => {
      appendPredicate(nodeId, newPredicate);
    },
    getChildrenIds: () => {
      return getChildrenIds(nodeId);
    },
    getPredicate: () => {
      return getPredicateById(nodeId);
    },
    makeEmptyPredicate,
    removeMe: () => {
      removePredicate(nodeId);
    },
    setConjunction: () => {
      return setConjunction(nodeId);
    },
    setDisjunction: () => {
      return setDisjunction(nodeId);
    },
  };
};
