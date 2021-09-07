/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/require-default-props */
// cSpell:ignore Componentized
import * as React from "react";

import {
  CONSTS,
  EXAMPLE_JSON_BLUE_SKIES,
  GabbyQueryProtocolContextProvider,
  GabbyAssetFactory,
  PredicateFormulaEditor,
  PredicateTreeVisitors,
} from "../../lib";

import type { TSerializedPredicateTree, TGabbyAssetsJson } from "../../lib";

import NodeMux from "./NodeMux";
import { LeafViewer } from "../ComponentizedComponents/LeafViewer";
import { BranchViewer } from "../ComponentizedComponents/BranchViewer";
import { DebugPredicateEditorHost } from "../PredicateEditor/DebugPredicateEditorHost";
import { ProjectionComponent } from "../Projection";
import * as opLabels from "../external-resources/operator-labels";

const gabbyAssetsJson: TGabbyAssetsJson = {
  subjectDictionaryJson: EXAMPLE_JSON_BLUE_SKIES.LIB.predicateSubjectsDictionaryJson,

  predicateTreeJson: EXAMPLE_JSON_BLUE_SKIES.LIB.predicateTreeJson,
  projectableSubjectsJson:
    EXAMPLE_JSON_BLUE_SKIES.PROJECTION.projectableSubjectDictionaryJson,

  projectionJson: EXAMPLE_JSON_BLUE_SKIES.PROJECTION.projectionJson,

  operatorLabelsJson: opLabels.AR,
};

const gabbyAssets = GabbyAssetFactory.fromJson(gabbyAssetsJson);

interface Props {
  predicateFormulaEditor?: PredicateFormulaEditor;
}

function QueryEditorComponentized({
  predicateFormulaEditor = gabbyAssets.predicateFormulaEditor,
}: Props): JSX.Element {
  //
  const [flatFile, setFlatFile] = React.useState<TSerializedPredicateTree>(
    predicateFormulaEditor.toJson().predicateTreeJson
  );
  const [nodeCounts, setNodeCounts] = React.useState({ all: 0, leafs: 0, branches: 0 });
  const updateFlatFile = (newFlatFile: TSerializedPredicateTree) => {
    setFlatFile(newFlatFile);
    countNodes();
  };
  React.useEffect(() => {
    countNodes();
  }, []);

  const countNodes = () => {
    const allNodeVisitor = new PredicateTreeVisitors.PredicateIdsAll();
    const branchNodeVisitor = new PredicateTreeVisitors.PredicateIdsBranches();
    const leafNodeVisitor = new PredicateTreeVisitors.PredicateIdsLeafs();

    predicateFormulaEditor.predicateTree.acceptVisitor(allNodeVisitor);
    predicateFormulaEditor.predicateTree.acceptVisitor(branchNodeVisitor);
    predicateFormulaEditor.predicateTree.acceptVisitor(leafNodeVisitor);

    setNodeCounts({
      all: allNodeVisitor.predicateIds.length,
      branches: branchNodeVisitor.predicateIds.length,
      leafs: leafNodeVisitor.predicateIds.length,
    });
  };

  return (
    <GabbyQueryProtocolContextProvider
      onChange={updateFlatFile}
      predicateFormulaEditor={predicateFormulaEditor}
      operatorLabels={gabbyAssets.operatorLabels}
      projectionEditor={gabbyAssets.projectionEditor}
    >
      <main className="App">
        <div style={{ marginLeft: "30%", paddingBottom: "30px" }}>
          <article style={{ textAlign: "left" }}>
            <h1>Internal Example Example/UseGabbyQueryProtocolContext</h1>
            <p>
              node counts: {JSON.stringify(nodeCounts)} <br />
              <br />
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
          nodeId={predicateFormulaEditor.rootNodeId}
          leafView={LeafViewer}
          branchView={BranchViewer}
        />
      </main>
    </GabbyQueryProtocolContextProvider>
  );
}

export default QueryEditorComponentized;
