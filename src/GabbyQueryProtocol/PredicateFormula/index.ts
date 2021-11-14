/* eslint-disable import/prefer-default-export */

import { usePredicateProperties } from "./hooks/usePredicateProperties";
import { useJunctionProperties } from "./hooks/useJunctionProperties";
import { usePredicateTreeUtilities } from "./hooks/usePredicateTreeUtilities";

import type { TPredicateFormulaEditorContextType } from "./context";
import { PredicateFormulaEditorContext } from "./context";

const PredicateFormulaEditorContextHooks = {
  usePredicateProperties,
  useJunctionProperties,
  usePredicateTreeUtilities,
};

export { PredicateFormulaEditorContextHooks, PredicateFormulaEditorContext };

export type { TPredicateFormulaEditorContextType };
export type { TPredicateOperatorLabels } from "./type";
