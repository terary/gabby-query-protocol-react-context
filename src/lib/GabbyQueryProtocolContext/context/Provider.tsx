/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/require-default-props */
import * as React from "react";

import { PredicateFormulaEditor, Validators } from "gabby-query-protocol-lib";
import type {
  TSerializedPredicateTree,
  TPredicateNode,
  TPredicateProperties,
} from "gabby-query-protocol-lib";

import { TPredicateOperatorLabels } from "../type";

import { defaultOperatorLabels } from "../../defaultOpLabels";

import type { TGabbyQueryProtocolContextType } from "./type";

export const GabbyQueryProtocolContext =
  React.createContext<TGabbyQueryProtocolContextType | null>(null);

interface Props {
  children?: React.ReactNode;
  predicateFormulaEditor: PredicateFormulaEditor;
  operatorLabels?: TPredicateOperatorLabels;
  onChange?: (flatTree: TSerializedPredicateTree) => void;
}
const noop = () => {};

const GabbyQueryProtocolContextProvider = ({
  children,
  onChange = noop,
  operatorLabels = defaultOperatorLabels,
  predicateFormulaEditor,
}: Props): JSX.Element => {
  //
  //  const setQueryExpression = (param: unknown) => {};

  const [queryExpression, setQueryExpression] = React.useState(
    // useState to make dependents 'aware' of change.
    // change/state is managed by predicateFormulaEditor

    predicateFormulaEditor.toJson().predicateTreeJson || {}
    // because return time is the same as input type, input type is optional
    // to allow for 'new' tree creation
  );

  const updateState = (newState: TSerializedPredicateTree) => {
    onChange(newState); // pretty sure this is for debug only
    setQueryExpression(newState);
  };

  const appendPredicate = (parentNodeId: string, term: TPredicateProperties): string => {
    const newPredicateId = predicateFormulaEditor.predicatesAppend(parentNodeId, term);
    updateState({
      ...predicateFormulaEditor.toJson().predicateTreeJson,
    });
    return newPredicateId;
  };

  const makeEmptyPredicate = () => {
    return predicateFormulaEditor.makeEmptyPredicate();
  };

  const getPredicateById = (nodeId: string) =>
    predicateFormulaEditor.predicatesGetById(nodeId);

  const getJunctionById = (nodeId: string) => {
    // should throw?
    return predicateFormulaEditor.predicatesGetJunctionById(nodeId);
  };

  const updatePredicate = (predicateId: string, predicate: TPredicateNode) => {
    const { hasError, errorMessages } = Validators.ValidatePredicateAgainstOperator(
      predicate,
      predicateFormulaEditor.subjectDictionary
    );

    if (hasError) {
      console.log("Update Predicate had the following errors", errorMessages);
      throw Error("Failed to update Predicate. Data validation error");
    }

    predicateFormulaEditor.predicatesReplace(predicateId, predicate);
    updateState({
      ...predicateFormulaEditor.toJson().predicateTreeJson,
    });
  };

  const removePredicate = (nodeId: string) => {
    predicateFormulaEditor.predicatesRemove(nodeId);
    updateState({
      ...predicateFormulaEditor.toJson().predicateTreeJson,
    });
  };

  const setDisjunction = (predicateId: string) => {
    predicateFormulaEditor.predicatesReplace(predicateId, {
      operator: "$or",
    });

    updateState({
      ...predicateFormulaEditor.toJson().predicateTreeJson,
    });
  };

  const setConjunction = (predicateId: string) => {
    predicateFormulaEditor.predicatesReplace(predicateId, {
      operator: "$and",
    });
    updateState({
      ...predicateFormulaEditor.toJson().predicateTreeJson,
    });
  };

  const getChildrenIds = (predicateId: string): string[] =>
    predicateFormulaEditor.predicatesGetChildrenIds(predicateId);

  const exportedProperties = {
    appendPredicate,
    getChildrenIds,
    getPredicateById,
    getJunctionById,
    makeEmptyPredicate,
    operatorLabels,
    removePredicate,
    setConjunction,
    setDisjunction,
    subjectDictionary: predicateFormulaEditor.subjectDictionary,
    updatePredicate,
  };

  return (
    <GabbyQueryProtocolContext.Provider value={exportedProperties}>
      {children}
    </GabbyQueryProtocolContext.Provider>
  );
};

export default GabbyQueryProtocolContextProvider;
