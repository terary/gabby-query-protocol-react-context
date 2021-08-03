import {
  TPredicateOperatorLabels,
  Projection,
  QuerySubjectDictionary,
} from "gabby-query-protocol-lib";
import type {
  TQueryNode,
  TQueryPredicate,
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
  TProjection,
} from "gabby-query-protocol-lib";
import { PassThrough } from "stream";
import { ModuleResolutionKind } from "typescript";

export type TGabbyQueryProtocolContextType = {
  appendPredicate: (parentNodeId: string, node: TQueryPredicate) => string;
  getChildrenIds: (predicateId: string) => string[];
  getPredicateById: (predicateId: string) => TQueryNode | null;
  makeEmptyPredicate: () => TQueryPredicate;
  operatorLabels: TPredicateOperatorLabels;
  projection: Projection;
  removePredicate: (predicateId: string) => void;
  setConjunction: (predicateId: string) => void;
  setDisjunction: (predicateId: string) => void;
  subjectDictionary: QuerySubjectDictionary;
  updatePredicate: (predicateId: string, node: TQueryNode) => void;

  // projection
  getOrderedProjectionList: () => TProjection;
  getProjectionItem: (projectionKey: string) => TProjectionProperties;
  addProjectionItem: (projectionItem: TProjectionProperties) => string;
  removeProjectionItem: (projectionKey: string) => void;
  updateProjectionSubject: (
    projectionKey: string,
    updateProps: TProjectionPropertiesUpdatable
  ) => void;
};
