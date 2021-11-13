// ------------------ projection
import {
  CONSTS as PROJECTION_CONSTS,
  EXAMPLE_JSON_BLUE_SKIES as PROJECTION_EXAMPLE_JSON_BLUE_SKIES,
} from "gabby-query-protocol-projection";
import {
  ProjectionContext,
  useProjectionSubjects,
  useProjectionUtilities,
} from "./Projections";
import type { TProjectionContextType } from "./Projections";

// ------------------ Predicate Formula
import {
  CONSTS as LIB_CONSTS,
  EXAMPLE_JSON_BLUE_SKIES as LIB_EXAMPLE_JSON_BLUE_SKIES,
} from "gabby-query-protocol-lib";
import type { TPredicateFormulaEditorContextType } from "./PredicateFormula";

import {
  PredicateFormulaEditorContextHooks,
  PredicateFormulaEditorContext,
} from "./PredicateFormula";

// ------------------ Misc
import * as opLabelsI18N from "./external-resources/operator-labels";

const GABBY_EXAMPLE_JSON_BLUE_SKIES = {
  LIB: LIB_EXAMPLE_JSON_BLUE_SKIES,
  PROJECTION: PROJECTION_EXAMPLE_JSON_BLUE_SKIES,
};

const GABBY_CONSTS = {
  LIB: LIB_CONSTS,
  PROJECTION: PROJECTION_CONSTS,
};

// ------------------------ Export
export { GABBY_EXAMPLE_JSON_BLUE_SKIES, GABBY_CONSTS, opLabelsI18N };

export const ProjectionContextHooks = {
  useProjectionSubjects,
  useProjectionUtilities,
};

export {
  PredicateFormulaEditorContext,
  PredicateFormulaEditorContextHooks,
  ProjectionContext,
  // ProjectionContextHooks,
};

export type { TPredicateFormulaEditorContextType, TProjectionContextType };
