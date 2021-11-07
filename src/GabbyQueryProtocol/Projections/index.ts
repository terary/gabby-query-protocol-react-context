import { ProjectionContext } from "./context";
import type { TProjectionContextType } from "./context";
import { useProjectionSubjects, useProjectionSubjectProperties } from "./hooks";

const ProjectionContextHooks = {
  useProjectionSubjects,
  useProjectionSubjectProperties,
};

export type { TProjectionContextType };
export { ProjectionContextHooks, ProjectionContext };
