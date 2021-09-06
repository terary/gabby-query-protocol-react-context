/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable import/first */
import QueryPredicateTreeProvider, { GabbyQueryProtocolContext } from "./context";

import {
  useProjectionSubjects,
  useProjectionSubjectProperties,
  useJunctionProperties,
  usePredicateProperties,
} from "./hooks";

import type { TGabbyQueryProtocolContextType } from "./context";
import type { TPredicateOperatorLabels } from "./type";

export default QueryPredicateTreeProvider;

export {
  GabbyQueryProtocolContext,
  useProjectionSubjects,
  useProjectionSubjectProperties,
  useJunctionProperties,
  usePredicateProperties,
};

export type { TGabbyQueryProtocolContextType };

// -
// ----------------------------------   ReExport
import {
  PredicateTree,
  PredicateSubjectDictionary,
  // ProjectionManager,
  // ProjectableSubjects,
} from "gabby-query-protocol-lib";

import type {
  TPredicateJunctionOperator,
  // TPredicateOperatorLabels,
  // TProjectionDictionary,
  // TProjectionProperties,
  TPredicateNode,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
  TPredicateSubjectWithId,
  TSerializedPredicateTree,
  // TPredicateSubjectDictionary,
  TValueLabelList,
} from "gabby-query-protocol-lib";

export type {
  TPredicateJunctionOperator,
  // TProjectionDictionary, // is this not used?
  // TProjectionProperties,
  TPredicateNode,
  TPredicateOperatorLabels,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
  TPredicateSubjectWithId,
  TSerializedPredicateTree,
  // TPredicateSubjectDictionary,
  TValueLabelList,
};

export {
  PredicateTree,
  PredicateSubjectDictionary,
  // ProjectionManager,
  // ProjectableSubjects,
};
