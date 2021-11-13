import {
  ProjectionEditorFactory,
  EXAMPLE_JSON_BLUE_SKIES,
} from "gabby-query-protocol-projection";
import type {} from "gabby-query-protocol-projection";

import { ProjectionContext } from "../index"; // "../GabbyQueryProtocol/Projections";
import { ReactNode } from "react";
const PROJECTION_EXAMPLE_JSON = EXAMPLE_JSON_BLUE_SKIES;

const projectionEditor = ProjectionEditorFactory.fromJson({
  projectableSubjectDictionaryJson: PROJECTION_EXAMPLE_JSON.projectableSubjectDictionaryJson,
  projectionItemsJson: PROJECTION_EXAMPLE_JSON.projectionJson,
});

const buildContextWrapper = () => {
  return function ContextWrapperSingleNodeTree({ children }: { children: ReactNode }) {
    return (
      <ProjectionContext.Provider projectionEditor={projectionEditor}>
        {children}
      </ProjectionContext.Provider>
    );
  };
};

export { buildContextWrapper, projectionEditor };
