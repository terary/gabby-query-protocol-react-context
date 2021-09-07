import {
  CONSTS as LIB_CONSTS,
  EXAMPLE_JSON_BLUE_SKIES as LIB_EXAMPLE_JSON_BLUE_SKIES,
  PredicateFormulaEditor,
  PredicateTree,
  PredicateTreeError,
} from "gabby-query-protocol-lib";

import { Validators } from "gabby-query-protocol-lib/dist/validators";
import type { TValidatorResponse } from "gabby-query-protocol-lib/dist/validators/types";

import type {
  TPredicateProperties,
  TPredicateOperator,
  TPredicatePropertiesArrayValue,
  TPredicateSubjectWithId,
  TSerializedPredicateTree,
  IVisitor,
} from "gabby-query-protocol-lib";

import { TreeVisitors as PredicateTreeVisitors } from "gabby-query-protocol-lib/dist/Predicates/TreeVisitors";

import {
  CONSTS as PROJECTION_CONSTS,
  EXAMPLE_JSON_BLUE_SKIES as PROJECTION_EXAMPLE_JSON_BLUE_SKIES,
} from "gabby-query-protocol-projection";

import type { TProjectionProperties } from "gabby-query-protocol-projection";

import GabbyQueryProtocolContextProvider, {
  GabbyQueryProtocolContext,
  useJunctionProperties,
  usePredicateProperties,
  useProjectionSubjectProperties,
  useProjectionSubjects,
} from "./GabbyQueryProtocolContext";

import type {
  TGabbyQueryProtocolContextType,
  TPredicateOperatorLabels,
} from "./GabbyQueryProtocolContext";

import { GabbyAssetFactory } from "./GabbyAssetFactory";
import type { TGabbyAssetsJson, TGabbyAssets } from "./GabbyAssetFactory";

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
  GabbyAssetFactory,
  GabbyQueryProtocolContext,
  GabbyQueryProtocolContextProvider,
  PredicateFormulaEditor,
  PredicateTree,
  PredicateTreeError,
  PredicateTreeVisitors,
  useJunctionProperties,
  usePredicateProperties,
  useProjectionSubjectProperties,
  useProjectionSubjects,
  Validators,
};
export type {
  IVisitor,
  TGabbyAssetsJson,
  TGabbyAssets,
  TGabbyQueryProtocolContextType,
  TPredicateProperties,
  TPredicateOperator,
  TPredicateOperatorLabels,
  TPredicatePropertiesArrayValue,
  TPredicateSubjectWithId,
  TProjectionProperties,
  TSerializedPredicateTree,
  TValidatorResponse,
};
