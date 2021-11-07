import {
  PredicateFormulaEditorFactory,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
} from "gabby-query-protocol-lib";
import GQPPredicateEditorContextProvider, {
  usePredicateTreeUtilities,
} from "../GabbyQueryProtocol/PredicateFormula";
import { PageContentWrapper, useApplicationUtilities } from "../Application";
import { customStyles } from "../Application/custom-styles";

import { GABBY_EXAMPLE_JSON_BLUE_SKIES } from "../GabbyQueryProtocol";
import * as predefinedOperatorLabels from "../GabbyQueryProtocol/external-resources/operator-labels";
import { PredicateFormulaViewer } from "../GabbyComponents/PredicateFormulaViewer";
import { Paper, Stack, Typography } from "@mui/material";
import { TSupportedLanguages } from "../Application/i18n/type";
const subjectDictionaryJson =
  GABBY_EXAMPLE_JSON_BLUE_SKIES.LIB.predicateSubjectsDictionaryJson;
const predicateFormula = GABBY_EXAMPLE_JSON_BLUE_SKIES.LIB.predicateTreeJson;

const predicateFormulaEditor = PredicateFormulaEditorFactory.fromJson({
  subjectDictionaryJson,
  predicateTreeJson: predicateFormula,
});

const validator = (
  predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
) => {
  return { hasError: false, errorMessages: [] };
};

export const PredicateTreeDemoPageRaw = (): JSX.Element => {
  const { getPredicateTreeAsJson } = usePredicateTreeUtilities();
  return (
    <PageContentWrapper>
      <div style={{ margin: "20px" }}>
        <Stack direction="row">
          <Stack
            direction="column"
            alignItems="start"
            spacing={3}
            sx={{ p: "10px", width: "100%" }}
          >
            <Paper sx={{ width: "100%" }}>
              <PredicateFormulaViewer rootPredicateId={predicateFormulaEditor.rootNodeId} />
            </Paper>

            <Paper sx={{ p: "10px" }} elevation={3}>
              <Typography color={customStyles.longText}>
                <section>
                  <h3>Gabby Query Protocol (GQP)</h3>
                  <h3 style={{ marginBottom: "5px" }}>TL;DR</h3>
                  <p style={{ marginTop: "5px" }}>
                    Abstracts away the technology specific attributes to create generic queries
                    that can be implemented across several different query engines, MySQL,
                    MongoDB, Postgres, Javascript Filter function, etc. Given the generic
                    nature of an GQP expression they are easily express using JSON,
                    Swagger/OAP, graphing diagrams etc.{" "}
                  </p>
                </section>
                <section style={{ marginTop: "25px" }}>
                  <h3 style={{ marginBottom: "5px" }}>Explained</h3>
                  <p style={{ marginTop: "5px" }}>
                    Many everyday phenomenon can be expressed using Directed Rooted Tree
                    Graphs*. Some examples include: determining permission validity, GraphQL
                    No/SQL statements, file system structures, etc.
                  </p>
                  <p>
                    Usually these expressions are system dependent and flexibility only comes
                    at the cost of security.
                  </p>
                  <p>
                    The purpose of Gabby Query Protocol (GQP) is to serve as a pattern to allow
                    system secure system agnostic communication of these expressions.
                  </p>
                  <p>
                    The GQP focuses on expressing query languages but can be easily
                    extend/extroplated to be applied to other similar patterns. At the core GQP
                    utilizes a a Predicate Tree model to share instructions on how to build
                    query expressions. Each system has its own implementation with a common
                    language (protocol). This layer of abstraction allow ease of validation,
                    flexibility to change underlying technologies without breaking depend
                    systems.
                  </p>
                  <p>
                    <ul>
                      Benefits include:
                      <li>
                        Freedom to change underlying systems without breaking client code
                      </li>
                      <li>Simplified validation (improved security)</li>
                      <li> Flexibility to allow clients to build their own queries</li>
                    </ul>
                  </p>
                  <p>
                    Predicate Tree. Basically its a Directed Tree Graph with a few constraints:
                    <ul>
                      <li>No single Child</li>
                      <li>No Orphan Child (Except maybe Root) </li>
                      <li> No Circular References (because its a tree)</li>
                      <li> All children have one and only one parent</li>
                      <li>All children have link to their parent </li>
                      <li>
                        No parent has a link to their children (characteristic of a single link
                        list)
                      </li>
                    </ul>
                  </p>
                  <p>
                    Each system implements GQP depending on their resources and requirements.
                  </p>
                  <p>
                    *Directed Rooted Tree Graphs. Also known as: Directed Rooted Acyclic Graph
                    or Arborescence
                  </p>
                </section>
              </Typography>
            </Paper>
          </Stack>
          <Paper sx={{ p: "10px" }}>
            Live Demo:
            <code>
              <pre>{JSON.stringify(getPredicateTreeAsJson(), null, 2)}</pre>
            </code>
          </Paper>
        </Stack>
      </div>
    </PageContentWrapper>
  );
};
const getOperatorLabels = (languageCode: TSupportedLanguages) => {
  // dealing with two 'supported languages'
  switch (languageCode) {
    case "ar":
    case "ar_ma":
      return predefinedOperatorLabels.AR;
    case "en":
    case "en_gb":
    case "en_us":
      return predefinedOperatorLabels.EN;
    case "es":
    case "es_es":
    case "es_mx":
    case "es_us":
      return predefinedOperatorLabels.ES;
    case "th":
    case "th_th":
      return predefinedOperatorLabels.TH;

    // to be explicit about missing opLabels, leave these as cases
    case "ru":
    case "ru_ru":
    case "de":
    case "de_de":
      return predefinedOperatorLabels.EN;

    default:
      return predefinedOperatorLabels.EN;
  }
};

export const PredicateTreeDemoPage = (): JSX.Element => {
  const { getCurrentLocale } = useApplicationUtilities();
  const locale = getCurrentLocale();
  // because languageCode may/not be in the form of language_region (en_gb, es_mx)
  const opLabels = getOperatorLabels(locale.languageCode as TSupportedLanguages);

  return (
    <GQPPredicateEditorContextProvider
      predicateFormulaEditor={predicateFormulaEditor}
      operatorLabels={opLabels}
    >
      <PredicateTreeDemoPageRaw />
    </GQPPredicateEditorContextProvider>
  );
};
