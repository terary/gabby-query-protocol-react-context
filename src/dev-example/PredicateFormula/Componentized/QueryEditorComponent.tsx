/* eslint-disable react/require-default-props */
import * as React from "react";

import {
  GabbyQueryProtocolContextProvider,
  PredicateFormulaEditor,
} from "../../import-from-lib";
import type { TPredicateOperatorLabels } from "../../import-from-lib";

import NodeMux from "./NodeMux";
import { LeafViewer } from "../ComponentizedComponents/LeafViewer";
import { BranchViewer } from "../ComponentizedComponents/BranchViewer";
import { CountersUsingVisitorPattern } from "./CountersUsingVisitorPattern";
import styles from "../../componentized.module.css";

interface Props {
  predicateFormulaEditor: PredicateFormulaEditor;
  operatorLabels?: TPredicateOperatorLabels;
}

function QueryEditorComponent({
  operatorLabels,
  predicateFormulaEditor,
}: Props): JSX.Element {
  /**
   * Purpose: Parent Wrapper.
   * Container and basic functionality for the whole predicate tree
   */

  // This state variable demonstrates onChange and Visitors - nothing more.
  //  Will have to add or remove predicates to see it work.
  const [nodeCounts, setNodeCounts] = React.useState({ all: 0, leafs: 0, branches: 0 });

  const updateCounts = () => {
    setNodeCounts(CountersUsingVisitorPattern(predicateFormulaEditor));
  };

  React.useEffect(() => {
    setNodeCounts(CountersUsingVisitorPattern(predicateFormulaEditor));
  }, []);

  return (
    <GabbyQueryProtocolContextProvider
      onChange={updateCounts}
      predicateFormulaEditor={predicateFormulaEditor}
      operatorLabels={operatorLabels}
    >
      <main className="App">
        <div style={{ marginLeft: "30%", paddingBottom: "30px" }}>
          <article style={{ textAlign: "left" }}>
            <h1>Internal Example Example/UseGabbyQueryProtocolContext</h1>
            <p>
              The intent of this example is to provide out-of-box working components with
              minimal other stuff.
            </p>
            <p>node counts: {JSON.stringify(nodeCounts)}</p>
          </article>
        </div>
        <hr />
        <p>Predicate Tree JSON </p>
        {JSON.stringify(predicateFormulaEditor.predicateTree.toJson())}
        <hr />
        <ul className={styles.horizontalList}>
          <li>
            <span>+</span> Add Child node
          </li>
          <li>
            <span>X</span> Remove Child node
          </li>
          <li>
            <span>...</span> Edit Node
          </li>
        </ul>
        <NodeMux
          nodeId={predicateFormulaEditor.rootNodeId}
          leafView={LeafViewer}
          branchView={BranchViewer}
        />
      </main>
    </GabbyQueryProtocolContextProvider>
  );
}

export default QueryEditorComponent;
