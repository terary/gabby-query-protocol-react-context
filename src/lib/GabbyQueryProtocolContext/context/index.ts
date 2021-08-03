// import { PredicateTree } from "./PredicateTree";
import QueryPredicateTreeProvider, { GabbyQueryProtocolContext } from "./Provider";

import type { TGabbyQueryProtocolContextType } from "./type";
// import type { SerializedTree } from "./DirectedTreeGraph";
// import { TQueryNode } from "../common/type";
export default QueryPredicateTreeProvider;

export { GabbyQueryProtocolContext };

// TODO - is this necessary.  It was necessary to import tree
//       in external project.  Is it defined somewhere else
// type TSerializedQuery = TSerializedTree<TQueryNode>;
export type {
  TGabbyQueryProtocolContextType,
  // SerializedTree as TSerializedTree,
  // TSerializedQuery,
};
