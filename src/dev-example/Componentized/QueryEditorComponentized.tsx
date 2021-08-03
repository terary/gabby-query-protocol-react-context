/* eslint-disable react/require-default-props */
// cSpell:ignore Componentized
import * as React from "react";
import {
  PredicateTree,
  TQueryNode,
  QuerySubjectDictionary,
  Projection,
  ProjectableSubjects,
} from "gabby-query-protocol-lib";
import type { TSerializedTree } from "gabby-query-protocol-lib";
import QueryPredicateTreeProvider from "../../lib/GabbyQueryProtocolContext";

import NodeMux from "./NodeMux";
import { LeafViewer } from "../ComponentizedComponents/LeafViewer";
import { BranchViewer } from "../ComponentizedComponents/BranchViewer";
import { DebugPredicateEditorHost } from "../PredicateEditor/DebugPredicateEditorHost";
import * as opLabels from "../external-resources/operator-labels";

import awesomeTreeNumber1Json from "../external-resources/awesome-query-number1.json";
import querySubjectDocument from "../external-resources/query-subjects.json";
import { ProjectionComponent } from "../Projection";
import * as projectableSubjectsJson from "../external-resources/projectable-fields.json";
import * as blueSky from "../external-resources/projection-flat-file.json";

// import * as projectableSubjectsJson from "../../external-files/projectable-fields.json";
// import * as blueSky from "../../external-files/projection-flat-file.json";

const projectableSubjects = ProjectableSubjects.fromJson(
  projectableSubjectsJson.projectableSubjects
);
const contextProjection = Projection.fromFlatFile(
  blueSky.projection,
  projectableSubjects
);

const querySubjectDictionary =
  QuerySubjectDictionary.fromJson(querySubjectDocument);
const awesomeTreeNumber1 = PredicateTree.fromFlatObject(
  awesomeTreeNumber1Json as TSerializedTree<TQueryNode>
);

interface Props {
  predicateTree?: PredicateTree;
}

function QueryEditorComponentized({
  // predicateTree = defaultPredictTree,
  // predicateTree = emptyPredicateTree,
  predicateTree = awesomeTreeNumber1,
}: Props): JSX.Element {
  const [flatFile, setFlatFile] = React.useState<TSerializedTree<TQueryNode>>(
    PredicateTree.toFlatObject(predicateTree)
  );
  const updateFlatFile = (newFlatFile: TSerializedTree<TQueryNode>) => {
    setFlatFile(newFlatFile);
  };

  return (
    <QueryPredicateTreeProvider
      onChange={updateFlatFile}
      subjectDictionary={querySubjectDictionary}
      predicateTree={predicateTree}
      operatorLabels={opLabels.AR}
      projection={contextProjection}
    >
      <main className="App">
        <div style={{ marginLeft: "30%", paddingBottom: "30px" }}>
          <article style={{ textAlign: "left" }}>
            <h1>Internal Example Example/UseGabbyQueryProtocolContext</h1>
            <p>
              The intent of this example is to provide out-of-box working
              concept with minimal other stuff.
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
