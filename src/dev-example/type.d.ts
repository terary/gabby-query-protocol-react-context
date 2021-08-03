interface LeafViewerProps {
  initialPredicate?: TQueryPredicate;
  nodeId: string;
  // operatorLabels?: TPredicateOperatorLabels;
}

interface BranchViewerProps {
  children: React.ReactNode[];
  nodeId: string;
}
