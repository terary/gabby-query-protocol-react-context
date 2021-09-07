/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
import * as React from "react";
import type {
  IProjectionEditor,
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
} from "gabby-query-protocol-projection";

import { PredicateFormulaEditor } from "gabby-query-protocol-lib";

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
  projectionEditor: IProjectionEditor;
  operatorLabels?: TPredicateOperatorLabels;
  // gabbyQueryResources: IGabbyQueryResources;
  onChange?: (flatTree: TSerializedPredicateTree) => void;
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (...a: unknown[]) => {};

const GabbyQueryProtocolContextProvider = ({
  children,
  onChange = noop,
  projectionEditor,
  operatorLabels = defaultOperatorLabels,
  predicateFormulaEditor,
}: Props): JSX.Element => {
  //
  const [_queryExpression, setQueryExpression] = React.useState<TSerializedPredicateTree>(
    // useState to make dependents 'aware' of change.
    // change/state is managed by predicateFormulaEditor

    predicateFormulaEditor.toJson().predicateTreeJson
  );

  const [currentProjection, setCurrentProjection] = React.useState(
    projectionEditor.getProjectionOrderByColumPosition()
  );

  // private (not exported)
  const updateProjectionState = () => {
    setCurrentProjection(projectionEditor.getProjectionOrderByColumPosition());
  };

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

  const updatePredicate = (nodeId: string, node: TPredicateNode) => {
    predicateFormulaEditor.predicatesReplace(nodeId, node);
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

  // **************************************     projection
  const addProjectionItem = (projectionSubject: TProjectionProperties): string => {
    // TODO - tmc - I think keys will change I think the getByOrder...
    //        rekeys? the keys should remain the same but this will return {newKey:{sameKey:properties}}
    //        ** MAYBE, I THINK **

    const newProjectionKey = projectionEditor.addSubject(projectionSubject);
    updateProjectionState();

    return newProjectionKey;
  };

  const getProjectionItem = (projectionKey: string) => {
    return projectionEditor.getProjectionSubject(projectionKey);
  };

  const getOrderedProjectionList = () => {
    return currentProjection;
  };

  const removeProjectionItem = (projectionKey: string): void => {
    projectionEditor.removeProjectionSubject(projectionKey);
    updateProjectionState();
  };

  const updateProjectionSubject = (
    projectionKey: string,
    updateProps: TProjectionPropertiesUpdatable
  ) => {
    projectionEditor.updateSubject(projectionKey, updateProps);
    updateProjectionState();
  };

  // end projection
  const exportedProperties = {
    appendPredicate,
    getChildrenIds,
    getPredicateById,
    getJunctionById,
    makeEmptyPredicate,
    operatorLabels,
    projectionEditor,
    removePredicate,
    setConjunction,
    setDisjunction,
    subjectDictionary: predicateFormulaEditor.subjectDictionary,
    updatePredicate,

    // projection
    addProjectionItem,
    getOrderedProjectionList,
    getProjectionItem,
    removeProjectionItem,
    updateProjectionSubject,
  };

  return (
    <GabbyQueryProtocolContext.Provider value={exportedProperties}>
      {children}
    </GabbyQueryProtocolContext.Provider>
  );
};

export default GabbyQueryProtocolContextProvider;
