import { Paper, Stack, Typography } from "@mui/material";
import { PageContentWrapper } from "../Application";
import { DemoProjectionInitialized } from "../GabbyComponents/ProjectionV2/DemoProjectionInitialized";
import GabbyThemeProvider from "../Application/AppContextProviders/GabbyThemeProvider";
import { customStyles } from "../Application/custom-styles";
import { uiConstants } from "../Application/ui-constants";

import {
  ProjectionEditorFactory,
  EXAMPLE_JSON_BLUE_SKIES,
} from "gabby-query-protocol-projection";

import { useProjectionSubjects } from "../GabbyQueryProtocol/Projections";
import GQPProjectionContextProvider from "../GabbyQueryProtocol/Projections";

const PROJECTION_EXAMPLE_JSON = EXAMPLE_JSON_BLUE_SKIES;

const projectionEditor = ProjectionEditorFactory.fromJson({
  projectableSubjectDictionaryJson: PROJECTION_EXAMPLE_JSON.projectableSubjectDictionaryJson,
  projectionItemsJson: PROJECTION_EXAMPLE_JSON.projectionJson,
});

const PredicateItemDefined = () => {
  return (
    <pre>
      {`
      {
        subjectId: string;
        sortOrder: number; // between [-1,1]
        columnOrder: number; // any number ok.
        label: string; 
      }`}
    </pre>
  );
};

export const ProjectionDemoPageRaw = (): JSX.Element => {
  const { getProjectionAsJson } = useProjectionSubjects();

  return (
    <PageContentWrapper>
      <div style={{ margin: "20px" }}>
        <Paper sx={{ p: "3px" }}>
          <DemoProjectionInitialized />
        </Paper>

        <Stack direction="row" spacing={3} sx={{ p: "10px" }}>
          <Paper sx={{ p: "10px" }}>
            <Typography color={customStyles.longText}>
              <section>
                <h2>Columns</h2>
                <h4>Also known as Projection</h4>
                <p>
                  A projection is an array of ProjectionItems. A ProjectionItem is defined as:
                  <code>
                    <PredicateItemDefined />
                  </code>
                  Notable oddities:
                  <ul>
                    <li>
                      <strong>Column Order</strong> in relational and not positional. Columns
                      with order of <code>[-3,-2,-2,0,1,5,5,7]</code> are acceptable. For best
                      results use unique values. The rational is that client code inject
                      columns and/or build calculations from columns{" "}
                      <code>E:2 = C:2 + B:2</code> or <code>SUM(E:2)</code>
                    </li>
                    <li>
                      <strong>Labels</strong> Support most languages. The query document
                      translations are done independent of the application. Hence, this
                      application maybe on one language while the labelling for Projections may
                      be in a different language.
                    </li>
                  </ul>
                </p>
                See <a href={uiConstants.projectionDocumentationUrl}>documentation</a> for more
                details.
              </section>
            </Typography>
          </Paper>
          <Paper sx={{ p: "10px" }}>
            Live Demo:
            <code>
              <pre>{JSON.stringify(getProjectionAsJson(), null, 2)}</pre>
            </code>
            <hr />
          </Paper>
        </Stack>
      </div>
    </PageContentWrapper>
  );
};

export const ProjectionDemoPage = () => {
  return (
    <GabbyThemeProvider>
      <GQPProjectionContextProvider projectionEditor={projectionEditor}>
        <ProjectionDemoPageRaw />
      </GQPProjectionContextProvider>
    </GabbyThemeProvider>
  );
};
