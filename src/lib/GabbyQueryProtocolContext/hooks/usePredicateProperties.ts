/* eslint-disable import/prefer-default-export */
import React from "react";
import type { TPredicateProperties } from "gabby-query-protocol-lib";
import { GabbyQueryProtocolContext, TGabbyQueryProtocolContextType } from "../context";

export const usePredicateProperties = (nodeId: string) => {
  const {
    appendPredicate,
    getPredicateById,
    operatorLabels,
    makeEmptyPredicate,
    removePredicate,
    updatePredicate,
  } = React.useContext(GabbyQueryProtocolContext) as TGabbyQueryProtocolContextType;

  return {
    appendPredicate: (newPredicate: TPredicateProperties) => {
      appendPredicate(nodeId, newPredicate);
    },
    makeEmptyPredicate,
    operatorLabels,
    queryPredicate: getPredicateById(nodeId) as TPredicateProperties,
    removeMe: () => {
      removePredicate(nodeId);
    },
    updateMe: (change: TPredicateProperties) => {
      updatePredicate(nodeId, change);
    },
  };
};
