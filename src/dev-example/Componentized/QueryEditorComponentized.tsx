/* eslint-disable react/require-default-props */
// cSpell:ignore Componentized
import * as React from "react";
import { EXAMPLE_JSON_BLUE_SKIES as projectionExampleData } from "gabby-query-protocol-projection";

import {
  EXAMPLE_JSON_BLUE_SKIES as exampleData,
  PredicateFormulaEditor,
} from "gabby-query-protocol-lib";

import type { TSerializedPredicateTree } from "gabby-query-protocol-lib";

import QueryPredicateTreeProvider from "../../lib/GabbyQueryProtocolContext";

import NodeMux from "./NodeMux";
import { LeafViewer } from "../ComponentizedComponents/LeafViewer";
import { BranchViewer } from "../ComponentizedComponents/BranchViewer";
import { DebugPredicateEditorHost } from "../PredicateEditor/DebugPredicateEditorHost";
import * as opLabels from "../external-resources/operator-labels";

import { ProjectionComponent } from "../Projection";

import { GabbyAssetFactory } from "../../lib/GabbyAssetFactory";
import type { TGabbyAssetsJson, TGabbyAssets } from "../../lib/GabbyAssetFactory";

// export type TGabbyResources = {
//   predicateFormulaEditor: PredicateFormulaEditor;
//   projectionEditor: IProjectionEditor;
//   operatorLabels: TPredicateOperatorLabels;
// };

// export type TGabbyAssetsJson = {
//   subjectDictionaryJson: TPredicateSubjectDictionaryJson;
//   predicateTreeJson?: TSerializedPredicateTree;
//   projectionJson?: TProjectionPropertiesJson[];
//   projectableSubjectsJson?: TProjectableSubjectsDictionaryJson;
//   operatorLabelsJson?: TPredicateOperatorLabels;
//   newRootId?: string;
// };
// projectionItemsJson: projectionExampleData.projectionJson,
// projectableSubjectDictionaryJson:
//   projectionExampleData.projectableSubjectDictionaryJson,
const gabbyAssetsJson: TGabbyAssetsJson = {
  subjectDictionaryJson: exampleData.predicateSubjectsDictionaryJson,
  predicateTreeJson: exampleData.predicateTreeJson,
  projectableSubjectsJson: projectionExampleData.projectableSubjectDictionaryJson,
  projectionJson: projectionExampleData.projectionJson,
  operatorLabelsJson: opLabels.AR,
};

const gabbyAssets = GabbyAssetFactory.fromJson(gabbyAssetsJson);

interface Props {
  predicateFormulaEditor?: PredicateFormulaEditor;
}

function QueryEditorComponentized({
  predicateFormulaEditor = gabbyAssets.predicateFormulaEditor,
}: Props): JSX.Element {
  const [flatFile, setFlatFile] = React.useState<TSerializedPredicateTree>(
    predicateFormulaEditor.toJson().predicateTreeJson
  );
  const updateFlatFile = (newFlatFile: TSerializedPredicateTree) => {
    setFlatFile(newFlatFile);
  };

  return (
    <QueryPredicateTreeProvider
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
    </QueryPredicateTreeProvider>
  );
}

export default QueryEditorComponentized;
