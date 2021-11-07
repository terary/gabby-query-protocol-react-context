/* eslint-disable import/prefer-default-export */
// import { usePredicateSubject } from "./hooks/index";
// export { usePredicateSubject };

import { usePredicateProperties } from "./hooks/usePredicateProperties";
import { useJunctionProperties } from "./hooks/useJunctionProperties";
import { usePredicateTreeUtilities } from "./hooks/usePredicateTreeUtilities";
import GQPPredicateEditorContextProvider, { GQPPredicateEditorContext } from "./context";
import type { TGQPPredicateEditorContextType } from "./context";

// import {
//   CONSTS as LIB_CONSTS,
//   EXAMPLE_JSON_BLUE_SKIES as LIB_EXAMPLE_JSON_BLUE_SKIES,
// } from "gabby-query-protocol-lib";

export default GQPPredicateEditorContextProvider;
export {
  // LIB_CONSTS,
  // LIB_EXAMPLE_JSON_BLUE_SKIES,
  GQPPredicateEditorContext,
  usePredicateProperties,
  useJunctionProperties,
  usePredicateTreeUtilities,
};

export type { TGQPPredicateEditorContextType };
