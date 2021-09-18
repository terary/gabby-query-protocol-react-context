/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable import/first */
import GQPProjectionContextProvider, { GQPProjectionContext } from "./context";

import { useProjectionSubjects, useProjectionSubjectProperties } from "./hooks";

import type { TGQProjectionContextType } from "./context";

export default GQPProjectionContextProvider;

export { GQPProjectionContext, useProjectionSubjects, useProjectionSubjectProperties };

export type { TGQProjectionContextType };

// -
// ----------------------------------   ReExport
// import {
//   PredicateTree,
//   PredicateSubjectDictionary,
//   // ProjectionManager,
//   // ProjectableSubjects,
// } from "gabby-query-protocol-lib";

// import type {
//   TPredicateJunctionOperator,
//   // TPredicateOperatorLabels,
//   // TProjectionDictionary,
//   // TProjectionProperties,
//   TPredicateNode,
//   TPredicateProperties,
//   TPredicatePropertiesArrayValue,
//   TPredicateSubjectWithId,
//   TSerializedPredicateTree,
//   // TPredicateSubjectDictionary,
//   TValueLabelList,
// } from "gabby-query-protocol-lib";

// export type {
//   TPredicateJunctionOperator,
//   // TProjectionDictionary, // is this not used?
//   // TProjectionProperties,
//   TPredicateNode,
//   TPredicateOperatorLabels,
//   TPredicateProperties,
//   TPredicatePropertiesArrayValue,
//   TPredicateSubjectWithId,
//   TSerializedPredicateTree,
//   // TPredicateSubjectDictionary,
//   TValueLabelList,
// };

// export {
//   PredicateTree,
//   PredicateSubjectDictionary,
//   // ProjectionManager,
//   // ProjectableSubjects,
// };
