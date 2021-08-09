/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
// cSpell:ignore Componentized
import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
// EXAMPLE_QUERY_DEFINITION_DOCUMENT_JSON as exampleData,

import {
  EXAMPLE_QUERY_DEFINITION_DOCUMENT_JSON as exampleData,
  // PredicateTree,
  PredicateTreeBuilder,
  PredicateSubjectDictionary,
  ProjectionManager,
  ProjectableSubjects,
  EXAMPLE_QUERY_DEFINITION_DOCUMENT_JSON,
} from "gabby-query-protocol-lib";

import type { TSerializedPredicateTree, IPredicateTree } from "gabby-query-protocol-lib";

import QueryPredicateTreeProvider from "../../lib/GabbyQueryProtocolContext";

import NodeMux from "./NodeMux";
import { LeafViewer } from "../ComponentizedComponents/LeafViewer";
import { BranchViewer } from "../ComponentizedComponents/BranchViewer";
import { DebugPredicateEditorHost } from "../PredicateEditor/DebugPredicateEditorHost";
import * as opLabels from "../external-resources/operator-labels";

import { ProjectionComponent } from "../Projection";

const awesomeTreeNumber1Json = EXAMPLE_QUERY_DEFINITION_DOCUMENT_JSON.predicateTreeJson;

const { projectionJson } = exampleData;
const { projectableSubjectsJson } = exampleData;
const { predicateSubjectsDictionaryJson } = exampleData;

const projectableSubjects = ProjectableSubjects.fromJson(projectableSubjectsJson);
const contextProjection = ProjectionManager.fromFlatFile(
  projectionJson,
  projectableSubjects
);

const predicateSubjectDictionary = PredicateSubjectDictionary.fromJson(
  predicateSubjectsDictionaryJson
);
// IPredicateTree
// const awesomeTreeNumber1 = PredicateTree.fromFlatObject(
//   awesomeTreeNumber1Json as TSerializedPredicateTree
// );
const awesomeTreeNumber1 = PredicateTreeBuilder.fromJson(
  awesomeTreeNumber1Json as TSerializedPredicateTree
);

interface Props {
  predicateTree?: IPredicateTree;
}

function QueryEditorComponentized({
  // predicateTree = defaultPredictTree,
  // predicateTree = emptyPredicateTree,
  predicateTree = awesomeTreeNumber1,
}: Props): JSX.Element {
  const [flatFile, setFlatFile] = React.useState<TSerializedPredicateTree>(
    predicateTree.toJson()
    // PredicateTree.toFlatObject(predicateTree)
  );
  const updateFlatFile = (newFlatFile: TSerializedPredicateTree) => {
    setFlatFile(newFlatFile);
  };

  return (
    <QueryPredicateTreeProvider
      onChange={updateFlatFile}
      subjectDictionary={predicateSubjectDictionary}
      predicateTree={predicateTree}
      operatorLabels={opLabels.AR}
      projection={contextProjection}
    >
      <main className="App">
        <div style={{ marginLeft: "30%", paddingBottom: "30px" }}>
          <article style={{ textAlign: "left" }}>
            <h1>Internal Example Example/UseGabbyQueryProtocolContext</h1>
            <p>
              The intent of this example is to provide out-of-box working concept with
              minimal other stuff.
              <br /> <br />
              This is intentionally ugly. Things you should not expect to see in
              production:
            </p>
            <ul>
              <li>Controls label with their types</li>
              <li>Raw expressions</li>
              <li>Ugly add/remove/change buttons</li>
              <li>Ugly CSS</li>
            </ul>
          </article>
        </div>
        <hr />
        <ProjectionComponent />
        <hr />
        <DebugPredicateEditorHost />
        <hr />
        {JSON.stringify(flatFile)}
        <hr />
        <NodeMux
          nodeId={predicateTree.rootNodeId}
          leafView={LeafViewer}
          branchView={BranchViewer}
        />
      </main>
    </QueryPredicateTreeProvider>
  );
}

export default QueryEditorComponentized;
