/* eslint-disable import/prefer-default-export */
import React from "react";
import type {
  TPredicatePropertiesJunction,
  TPredicateProperties,
} from "gabby-query-protocol-lib";
import { GabbyQueryProtocolContext, TGabbyQueryProtocolContextType } from "../context";

export const useJunctionProperties = (nodeId: string) => {
  const {
    appendPredicate,
    getChildrenIds,
    operatorLabels,
    getJunctionById,
    makeEmptyPredicate,
    removePredicate,
    setConjunction: setNodeConjunction,
    setDisjunction: setNodeDisjunction,
  } = React.useContext(GabbyQueryProtocolContext) as TGabbyQueryProtocolContextType;
  //
  return {
    queryPredicate: getJunctionById(nodeId) as TPredicatePropertiesJunction,

    appendPredicate: (newPredicate: TPredicateProperties) => {
      appendPredicate(nodeId, newPredicate);
    },

    getChildrenIds: () => {
      return getChildrenIds(nodeId);
    },

    getPredicateProperties: (): TPredicatePropertiesJunction => {
      return getJunctionById(nodeId);
    },

    makeEmptyPredicate,

    operatorLabels,

    removeMe: () => {
      removePredicate(nodeId);
    },

    setConjunction: () => {
      // untestable
      // tests gives: "Maximum update depth exceeded"
      // doesn't seem to be an issue when running in dev/prod.
      // not sure why tests do it
      setNodeConjunction(nodeId);
    },

    setDisjunction: () => {
      // untestable
      // tests gives: "Maximum update depth exceeded"
      // doesn't seem to be an issue when running in dev/prod.
      // not sure why tests do it
      setNodeDisjunction(nodeId);
    },
  };
};
