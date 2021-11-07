/* eslint-disable import/prefer-default-export */
import { Paper } from "@mui/material";
import {
  ProjectionEditorFactory,
  EXAMPLE_JSON_BLUE_SKIES,
  TProjectionProperties,
} from "gabby-query-protocol-projection";
import { ProjectionInteractive } from "./ProjectionInteractive";
import { ProjectionItemCreator } from "./ProjectionItemCreator";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { customStyles } from "../../Application/custom-styles";
const PROJECTION_EXAMPLE_JSON = EXAMPLE_JSON_BLUE_SKIES;

const projectionEditor = ProjectionEditorFactory.fromJson({
  projectableSubjectDictionaryJson: PROJECTION_EXAMPLE_JSON.projectableSubjectDictionaryJson,
  projectionItemsJson: PROJECTION_EXAMPLE_JSON.projectionJson,
});

export const DemoProjectionInitialized = (): JSX.Element => {
  const theme = useTheme();
  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          borderRadius: "5px",
          backgroundColor: theme.palette.grey[100],
          border: `1px solid ${customStyles.sectionBorder}`,
        }}
      >
        <ProjectionItemCreator />
        <ProjectionInteractive />
      </div>
    </div>
  );
};
