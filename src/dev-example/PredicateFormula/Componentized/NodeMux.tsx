import * as React from "react";
import { GabbyQueryProtocolContext } from "../../import-from-lib";
import type { TGabbyQueryProtocolContextType } from "../../import-from-lib";
import { BranchViewer } from "../ComponentizedComponents/BranchViewer";

type NodeMuxProps = {
  nodeId: string;
  leafView: (leafElement: LeafViewerProps) => JSX.Element;
  branchView: (leafElement: BranchViewerProps) => JSX.Element;
};

const NodeMux = ({ nodeId, branchView, leafView }: NodeMuxProps): JSX.Element => {
  /**
   * Purpose serves as a switch or Multiplexer.
   * For each node present either leaf or branch
   */
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
    // return branchView(props);
    return <BranchViewer nodeId={nodeId}>{children}</BranchViewer>;
  };

  const LeafView = () => {
    const props = {
      nodeId,
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
