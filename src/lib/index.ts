import {
  CONSTS as LIB_CONSTS,
  EXAMPLE_JSON_BLUE_SKIES as LIB_EXAMPLE_JSON_BLUE_SKIES,
  PredicateFormulaEditor,
  PredicateTree,
  PredicateTreeError,
  Validators,
} from "gabby-query-protocol-lib";

import type {
  TPredicateProperties,
  TPredicateOperator,
  TPredicatePropertiesArrayValue,
  TPredicateSubjectWithId,
  TSerializedPredicateTree,
  TValidatorResponse,
  IVisitor,
  TValueLabelList,
} from "gabby-query-protocol-lib";

import { TreeVisitors as PredicateTreeVisitors } from "gabby-query-protocol-lib/dist/Predicates/TreeVisitors";

import {
  CONSTS as PROJECTION_CONSTS,
  EXAMPLE_JSON_BLUE_SKIES as PROJECTION_EXAMPLE_JSON_BLUE_SKIES,
  ProjectionEditorFactory,
} from "gabby-query-protocol-projection";

import type {
  TProjectionDictionary,
  IProjectionEditor,
  TProjectionProperties,
} from "gabby-query-protocol-projection";

import GabbyQueryProtocolContextProvider, {
  GabbyQueryProtocolContext,
  useJunctionProperties,
  usePredicateProperties,
} from "./GabbyQueryProtocolContext";

import {
  useProjectionSubjectProperties,
  useProjectionSubjects,
} from "./GQPProjectionContext";

import type {
  TGabbyQueryProtocolContextType,
  TPredicateOperatorLabels,
} from "./GabbyQueryProtocolContext";

import { defaultOperatorLabels } from "./defaultOpLabels";

// Lib/Projection should never conflict.  Some day in the future there
// maybe a gabby-common package that includes these consts
const CONSTS = {
  ...LIB_CONSTS,
  ...PROJECTION_CONSTS,
  ...{ DEFAULT_OPERATOR_LABELS: defaultOperatorLabels },
};

const EXAMPLE_JSON_BLUE_SKIES = {
  LIB: LIB_EXAMPLE_JSON_BLUE_SKIES,
  PROJECTION: PROJECTION_EXAMPLE_JSON_BLUE_SKIES,
};

export {
  CONSTS,
  EXAMPLE_JSON_BLUE_SKIES,
  GabbyQueryProtocolContext,
  GabbyQueryProtocolContextProvider,
  PredicateFormulaEditor,
  PredicateTree,
  PredicateTreeError,
  PredicateTreeVisitors,
  ProjectionEditorFactory,
  useJunctionProperties,
  usePredicateProperties,
  useProjectionSubjectProperties,
  useProjectionSubjects,
  Validators,
};
export type {
  IProjectionEditor,
  IVisitor,
  TGabbyQueryProtocolContextType,
  TPredicateProperties,
  TPredicateOperator,
  TPredicateOperatorLabels,
  TPredicatePropertiesArrayValue,
  TPredicateSubjectWithId,
  TProjectionDictionary,
  TProjectionProperties,
  TSerializedPredicateTree,
  TValidatorResponse,
  TValueLabelList,
};
