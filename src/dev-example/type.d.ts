interface LeafViewerProps {
  initialPredicate?: TPredicateProperties;
  nodeId: string;
  // operatorLabels?: TPredicateOperatorLabels;
}

interface BranchViewerProps {
  children: React.ReactNode[];
  nodeId: string;
}
