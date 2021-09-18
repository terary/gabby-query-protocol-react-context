/* eslint-disable import/prefer-default-export */
import React from "react";
import type { TPredicateProperties, TValidatorResponse } from "gabby-query-protocol-lib";
import { Validators } from "gabby-query-protocol-lib";
import { GabbyQueryProtocolContext, TGabbyQueryProtocolContextType } from "../context";

export const usePredicateProperties = (nodeId: string) => {
  const {
    appendPredicate,
    getPredicateById,
    operatorLabels,
    makeEmptyPredicate,
    removePredicate,
    updatePredicate,
    subjectDictionary,
  } = React.useContext(GabbyQueryProtocolContext) as TGabbyQueryProtocolContextType;

  return {
    appendPredicate: (newPredicate: TPredicateProperties) => {
      appendPredicate(nodeId, newPredicate);
    },
    validatePredicateProperties: (
      predicateProperties: TPredicateProperties
    ): TValidatorResponse => {
      return Validators.ValidatePredicateAgainstOperator(
        predicateProperties,
        subjectDictionary
      );
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
