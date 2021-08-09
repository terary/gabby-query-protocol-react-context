/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
import * as React from "react";
import {
  // PredicateTree,
  // PredicateTreeBuilder,
  ProjectionManager,
  // TSerializedTree,
  TSerializedPredicateTree, // type should be imported as type
} from "gabby-query-protocol-lib";

import type {
  IPredicateTree,
  // IPredicateTreeBuilder,
  TPredicateNode,
  PredicateSubjectDictionary, // is this a type?
  TPredicateProperties,
  // TPredicateOperatorLabels,
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
} from "gabby-query-protocol-lib";
import { TPredicateOperatorLabels } from "../type";

import { defaultOperatorLabels } from "./defaultOpLabels";

import type { TGabbyQueryProtocolContextType } from "./type";

export const GabbyQueryProtocolContext =
  React.createContext<TGabbyQueryProtocolContextType | null>(null);

interface Props {
  children?: React.ReactNode;
  predicateTree: IPredicateTree;
  projection: ProjectionManager;
  subjectDictionary: PredicateSubjectDictionary;
  operatorLabels?: TPredicateOperatorLabels;
  onChange?: (flatTree: TSerializedPredicateTree) => void;
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (...a: unknown[]) => {};

const PredicateTreeProvider = ({
  children,
  onChange = noop,
  operatorLabels = defaultOperatorLabels,
  predicateTree,
  projection,
  subjectDictionary,
}: Props): JSX.Element => {
  // empty comment

  const [_queryExpression, setQueryExpression] = React.useState<TSerializedPredicateTree>(
    predicateTree.toJson()
    // PredicateTreeBuilder.toJson(predicateTree)
    // PredicateTree.toFlatObject(predicateTree)
  );

  const [currentProjection, setCurrentProjection] = React.useState(
    projection.getProjectionOrderByColumPosition()
  );

  // private (not exported)
  const updateProjectionState = () => {
    setCurrentProjection(projection.getProjectionOrderByColumPosition());
  };

  // private (not exported)
  const updateState = (newState: TSerializedPredicateTree) => {
    onChange(newState); // pretty sure this is for debug only
    setQueryExpression(newState);
  };

  const appendPredicate = (parentNodeId: string, term: TPredicateProperties): string => {
    const newPredicateId = predicateTree.appendPredicate(parentNodeId, term);
    updateState({
      ...predicateTree.toJson(),
    });
    return newPredicateId;
  };

  const makeEmptyPredicate = () => {
    return subjectDictionary.makeEmptyPredicate();
  };

  const getPredicateById = (nodeId: string) => predicateTree.getPredicateById(nodeId);

  const updatePredicate = (nodeId: string, node: TPredicateNode) => {
    predicateTree.replacePredicate(nodeId, node);
    updateState({
      ...predicateTree.toJson(),
    });
  };

  const removePredicate = (nodeId: string) => {
    predicateTree.removePredicate(nodeId);
    updateState({
      ...predicateTree.toJson(),
    });
  };

  // TODO - tmc - can all these updateState be refactored to one call (or is it already)?

  const setDisjunction = (predicateId: string) => {
    predicateTree.replacePredicate(predicateId, { operator: "$or" });
    updateState({
      ...predicateTree.toJson(),
    });
  };

  const setConjunction = (predicateId: string) => {
    predicateTree.replacePredicate(predicateId, { operator: "$and" });
    updateState({
      ...predicateTree.toJson(),
    });
  };

  const getChildrenIds = (nodeId: string): string[] =>
    predicateTree.getChildrenIds(nodeId);

  // **************************************     projection
  const addProjectionItem = (projectionSubject: TProjectionProperties): string => {
    // TODO - tmc - I think keys will change I think the getByOrder...
    //        rekeys? the keys should remain the same but this will return {newKey:{sameKey:properties}}
    //        ** MAYBE, I THINK **

    const newProjectionKey = projection.addSubject(projectionSubject);
    updateProjectionState();

    return newProjectionKey;
  };

  const getProjectionItem = (projectionKey: string) => {
    return projection.getProjectionSubject(projectionKey);
  };

  const getOrderedProjectionList = () => {
    return currentProjection;
    // this or projection.getProjectionOrderByColumPosition()
    // currentProjection is the right choice.
  };

  const removeProjectionItem = (projectionKey: string): void => {
    projection.removeProjectionSubject(projectionKey);
    updateProjectionState();
  };

  const updateProjectionSubject = (
    projectionKey: string,

    updateProps: TProjectionPropertiesUpdatable
  ) => {
    projection.updateSubject(projectionKey, updateProps);
    updateProjectionState();
  };

  // end projection
  const exportedProperties = {
    appendPredicate,
    getChildrenIds,
    getPredicateById,
    makeEmptyPredicate,
    operatorLabels,
    projection,
    removePredicate,
    setConjunction,
    setDisjunction,
    subjectDictionary,
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

export default PredicateTreeProvider;
