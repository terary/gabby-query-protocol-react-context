import * as React from "react";

import { GabbyQueryProtocolContext } from "../../lib/GabbyQueryProtocolContext";

// import * as OpLabels from "../operator-labels";
import type {
  TGabbyQueryProtocolContextType,
  // TQueryPredicateJunction,
  // TQueryPredicate,
} from "../../lib/GabbyQueryProtocolContext";

type NodeMuxProps = {
  nodeId: string;
  leafView: (leafElement: LeafViewerProps) => JSX.Element;
  branchView: (leafElement: BranchViewerProps) => JSX.Element;
};

const NodeMux = ({
  nodeId,
  branchView,
  leafView,
}: NodeMuxProps): JSX.Element => {
  // could use a hook but for demonstration purposes querying Context
  const { getChildrenIds } = React.useContext(
    GabbyQueryProtocolContext
  ) as TGabbyQueryProtocolContextType;

  const childrenNodeIds = getChildrenIds(nodeId);

  const BranchView = () => {
    const children = childrenNodeIds.map((childId) => (
      <NodeMux
        nodeId={childId}
        key={childId}
        leafView={leafView}
        branchView={branchView}
      />
    ));

    const props = {
      nodeId,
      children,
    };
    return branchView(props);
  };

  const LeafView = () => {
    const props = {
      nodeId,
      // operatorLabels: OpLabels.SymbolsEntities,
    };
    return leafView(props);
  };

  return (
    <>
      {childrenNodeIds.length > 0 && <BranchView />}
      {childrenNodeIds.length === 0 && <LeafView />}
    </>
  );
};

export default NodeMux;
