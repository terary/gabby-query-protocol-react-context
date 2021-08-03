/* eslint-disable import/order */
/* eslint-disable import/first */
import QueryPredicateTreeProvider, { GabbyQueryProtocolContext } from "./context";

import {
  useProjectionProperties,
  useProjectionSubjectProperties,
  useJunctionProperties,
  usePredicateProperties,
} from "./hooks";

import type { TGabbyQueryProtocolContextType } from "./context";

export default QueryPredicateTreeProvider;

export {
  GabbyQueryProtocolContext,
  useProjectionProperties,
  useProjectionSubjectProperties,
  useJunctionProperties,
  usePredicateProperties,
};

export type { TGabbyQueryProtocolContextType };

// -
// ----------------------------------   ReExport
import {
  PredicateTree,
  QuerySubjectDictionary,
  Projection,
  ProjectableSubjects,
} from "gabby-query-protocol-lib";

import type {
  TPredicateOperator,
  TPredicateOperatorLabels,
  TProjectionProperties,
  TQueryNode,
  TQueryPredicate,
  TQueryPredicateArrayValue,
  TQuerySubjectWithId,
  TSerializedTree,
  TSubjectDocument,
  TValueLabelList,
} from "gabby-query-protocol-lib";

export type {
  TPredicateOperator,
  TPredicateOperatorLabels,
  TProjectionProperties,
  TQueryNode,
  TQueryPredicate,
  TQueryPredicateArrayValue,
  TQuerySubjectWithId,
  TSerializedTree,
  TSubjectDocument,
  TValueLabelList,
};

export { PredicateTree, QuerySubjectDictionary, Projection, ProjectableSubjects };
