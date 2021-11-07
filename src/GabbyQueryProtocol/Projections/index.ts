/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable import/first */
import GQPProjectionContextProvider, { GQPProjectionContext } from "./context";

import { useProjectionSubjects, useProjectionSubjectProperties } from "./hooks";

import type { TGQProjectionContextType } from "./context";

export default GQPProjectionContextProvider;

export { GQPProjectionContext, useProjectionSubjects, useProjectionSubjectProperties };

export type { TGQProjectionContextType };
