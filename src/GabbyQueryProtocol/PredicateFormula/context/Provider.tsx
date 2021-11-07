/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/require-default-props */
import React, { useState } from "react";

import glib, {
  PredicateFormulaEditor,
  Validators,
  TreeVisitors,
  TPredicateJunctionPropsWithChildIds,
} from "gabby-query-protocol-lib";

import type {
  TSerializedPredicateTree,
  TPredicateNode,
  TPredicateProperties,
} from "gabby-query-protocol-lib";

import { TPredicateOperatorLabels } from "../type";

import { defaultOperatorLabels } from "../defaultOpLabels";

import type { TGQPPredicateEditorContextType } from "./type";

export const GQPPredicateEditorContext =
  React.createContext<TGQPPredicateEditorContextType | null>(null);

interface Props {
  children?: React.ReactNode;
  predicateFormulaEditor: PredicateFormulaEditor;
  operatorLabels?: TPredicateOperatorLabels;
  onChange?: (flatTree: TSerializedPredicateTree) => void;
}
const noop = () => {};

const GQPPredicateEditorContextProvider = ({
  children,
  onChange = noop,
  operatorLabels = defaultOperatorLabels,
  predicateFormulaEditor,
}: Props): JSX.Element => {
  //
  //  const setQueryExpression = (param: unknown) => {};

  const [queryExpression, setQueryExpression] = useState(
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

  const isBranchNode = (predicateId: string) => {
    return predicateFormulaEditor.predicateTree.isBranch(predicateId);
  };

  const getLeafIdsAll = () => {
    const leafVisitor = new TreeVisitors.PredicateIdsLeafs();

    predicateFormulaEditor.predicateTree.acceptVisitor(leafVisitor);
    return leafVisitor.predicateIds || [];
  };

  const getRootId = () => {
    return predicateFormulaEditor.rootNodeId;
  };

  const getPredicateLeafById = (predicateId: string) => {
    return predicateFormulaEditor.predicatesGetPropertiesById(predicateId);
  };

  const getPredicateById = (nodeId: string) =>
    predicateFormulaEditor.predicatesGetById(nodeId);

  const getJunctionById = (nodeId: string) => {
    //  does throw
    return predicateFormulaEditor.predicatesGetJunctionById(nodeId);
    // if (isBranchNode(nodeId)) {

    // }
    // return {} as TPredicateJunctionPropsWithChildIds;
  };

  const getPredicateTreeAsJson = (): TSerializedPredicateTree => {
    return predicateFormulaEditor.toJson().predicateTreeJson as TSerializedPredicateTree;
  };

  const isRoot = (predicateId: string) => {
    return predicateId === predicateFormulaEditor.rootNodeId;
  };

  const updatePredicate = (predicateId: string, predicate: TPredicateNode) => {
    const { hasError, errorMessages } = Validators.ValidatePredicateAgainstOperator(
      predicate,
      predicateFormulaEditor.subjectDictionary
    );

    if (hasError) {
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
    isBranchNode(predicateId)
      ? predicateFormulaEditor.predicatesGetChildrenIds(predicateId)
      : [];

  const exportedProperties = {
    appendPredicate,
    getChildrenIds,
    getJunctionById,
    getLeafIdsAll,
    getPredicateById,
    getPredicateLeafById,
    getPredicateTreeAsJson,
    makeEmptyPredicate,
    isBranchNode,
    isRoot,
    operatorLabels,
    removePredicate,
    setConjunction,
    setDisjunction,
    subjectDictionary: predicateFormulaEditor.subjectDictionary,
    updatePredicate,
  };

  return (
    <GQPPredicateEditorContext.Provider value={exportedProperties}>
      {children}
    </GQPPredicateEditorContext.Provider>
  );
};

export default GQPPredicateEditorContextProvider;
