/* eslint-disable react/require-default-props */
import * as React from "react";
import {
  PredicateTree,
  TSerializedTree,
  QuerySubjectDictionary,
  Projection,
} from "gabby-query-protocol-lib";

import type {
  TQueryNode,
  TQueryPredicate,
  TPredicateOperatorLabels,
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
} from "gabby-query-protocol-lib";
import { defaultOperatorLabels } from "./defaultOpLabels";

import type { TGabbyQueryProtocolContextType } from "./type";

export const GabbyQueryProtocolContext = React.createContext<TGabbyQueryProtocolContextType | null>(
  null
);

interface Props {
  children?: React.ReactNode;
  predicateTree: PredicateTree;
  projection: Projection;
  subjectDictionary: QuerySubjectDictionary;
  operatorLabels?: TPredicateOperatorLabels;
  onChange?: (flatTree: TSerializedTree<TQueryNode>) => void;
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

  const [_queryExpression, setQueryExpression] = React.useState<
    TSerializedTree<TQueryNode>
  >(PredicateTree.toFlatObject(predicateTree));

  const [currentProjection, setCurrentProjection] = React.useState(
    projection.getProjectionOrderByColumPosition()
  );

  // private (not exported)
  const updateProjectionState = () => {
    setCurrentProjection(projection.getProjectionOrderByColumPosition());
  };

  // private (not exported)
  const updateState = (newState: TSerializedTree<TQueryNode>) => {
    onChange(newState); // pretty sure this is for debug only
    setQueryExpression(newState);
  };

  const appendPredicate = (parentNodeId: string, term: TQueryPredicate): string => {
    const newPredicateId = predicateTree.appendPredicate(parentNodeId, term);
    updateState({
      ...PredicateTree.toFlatObject(predicateTree),
    });
    return newPredicateId;
  };

  const makeEmptyPredicate = () => {
    return subjectDictionary.makeEmptyPredicate();
  };

  const getPredicateById = (nodeId: string) => predicateTree.getPredicateById(nodeId);

  const updatePredicate = (nodeId: string, node: TQueryNode) => {
    predicateTree.replacePredicate(nodeId, node);
    updateState({
      ...PredicateTree.toFlatObject(predicateTree),
    });
  };

  const removePredicate = (nodeId: string) => {
    predicateTree.removePredicate(nodeId);
    updateState({
      ...PredicateTree.toFlatObject(predicateTree),
    });
  };

  const setDisjunction = (predicateId: string) => {
    predicateTree.replacePredicate(predicateId, { operator: "$or" });
    updateState({
      ...PredicateTree.toFlatObject(predicateTree),
    });
  };

  const setConjunction = (predicateId: string) => {
    predicateTree.replacePredicate(predicateId, { operator: "$and" });
    updateState({
      ...PredicateTree.toFlatObject(predicateTree),
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
