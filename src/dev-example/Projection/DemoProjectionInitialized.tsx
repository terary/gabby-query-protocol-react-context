/* eslint-disable import/prefer-default-export */
import { EXAMPLE_JSON_BLUE_SKIES, ProjectionEditorFactory } from "../../lib";

import GQPProjectionContextProvider from "../../lib/GQPProjectionContext";
import { ProjectionComponent } from "./ProjectionComponent";

const PROJECTION_EXAMPLE_JSON = EXAMPLE_JSON_BLUE_SKIES.PROJECTION;

const projectionEditor = ProjectionEditorFactory.fromJson({
  projectableSubjectDictionaryJson:
    PROJECTION_EXAMPLE_JSON.projectableSubjectDictionaryJson,
  projectionItemsJson: PROJECTION_EXAMPLE_JSON.projectionJson,
});

export const DemoProjectionInitialized = (): JSX.Element => {
  return (
    <GQPProjectionContextProvider projectionEditor={projectionEditor}>
      <div>
        <h3>Projection (Context)</h3>
        <hr />
        <ProjectionComponent />
        <hr />
      </div>
    </GQPProjectionContextProvider>
  );
};
