/* eslint-disable import/no-extraneous-dependencies */
import {
  // TPredicateOperatorLabels,
  ProjectionManager,
  PredicateSubjectDictionary,
} from "gabby-query-protocol-lib";
import type {
  TPredicateNode,
  TPredicateProperties,
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
  TProjectionDictionary,
} from "gabby-query-protocol-lib";
import { TPredicateOperatorLabels } from "../type";

export type TGabbyQueryProtocolContextType = {
  appendPredicate: (parentNodeId: string, node: TPredicateProperties) => string;
  getChildrenIds: (predicateId: string) => string[];
  getPredicateById: (predicateId: string) => TPredicateNode | null;
  makeEmptyPredicate: () => TPredicateProperties;
  operatorLabels: TPredicateOperatorLabels;
  projection: ProjectionManager;
  removePredicate: (predicateId: string) => void;
  setConjunction: (predicateId: string) => void;
  setDisjunction: (predicateId: string) => void;
  subjectDictionary: PredicateSubjectDictionary;
  updatePredicate: (predicateId: string, node: TPredicateNode) => void;

  // projection
  getOrderedProjectionList: () => TProjectionDictionary;
  getProjectionItem: (projectionKey: string) => TProjectionProperties;
  addProjectionItem: (projectionItem: TProjectionProperties) => string;
  removeProjectionItem: (projectionKey: string) => void;
  updateProjectionSubject: (
    projectionKey: string,
    updateProps: TProjectionPropertiesUpdatable
  ) => void;
};
