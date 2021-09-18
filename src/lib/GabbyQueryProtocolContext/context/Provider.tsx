/* eslint-disable import/no-extraneous-dependencies */
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
  // projectionEditor: IProjectionEditor;
  operatorLabels?: TPredicateOperatorLabels;
  // gabbyQueryResources: IGabbyQueryResources;
  onChange?: (flatTree: TSerializedPredicateTree) => void;
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (...a: unknown[]) => {};

const GabbyQueryProtocolContextProvider = ({
  children,
  onChange = noop,
  // projectionEditor,
  operatorLabels = defaultOperatorLabels,
  predicateFormulaEditor,
}: Props): JSX.Element => {
  //
  const [_queryExpression, setQueryExpression] = React.useState<TSerializedPredicateTree>(
    // useState to make dependents 'aware' of change.
    // change/state is managed by predicateFormulaEditor

    predicateFormulaEditor.toJson().predicateTreeJson || {}
    // because return time is the same as input type, input type is optional
    // to allow for 'new' tree creation
  );

  // const [currentProjection, setCurrentProjection] = React.useState(
  //   projectionEditor.getProjectionOrderByColumPosition()
  // );

  // private (not exported)
  // const updateProjectionState = () => {
  //   setCurrentProjection(projectionEditor.getProjectionOrderByColumPosition());
  // };

  // private (not exported)
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
    // projectionEditor,
    removePredicate,
    setConjunction,
    setDisjunction,
    subjectDictionary: predicateFormulaEditor.subjectDictionary,
    updatePredicate,

    // projection
    // addProjectionItem,
    // getOrderedProjectionList,
    // getProjectionItem,
    // removeProjectionItem,
    // updateProjectionSubject,
  };

  return (
    <GabbyQueryProtocolContext.Provider value={exportedProperties}>
      {children}
    </GabbyQueryProtocolContext.Provider>
  );
};

export default GabbyQueryProtocolContextProvider;
