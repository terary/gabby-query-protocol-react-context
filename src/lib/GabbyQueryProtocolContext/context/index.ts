// import { PredicateTree } from "./PredicateTree";
import QueryPredicateTreeProvider, { GabbyQueryProtocolContext } from "./Provider";

import type { TGabbyQueryProtocolContextType } from "./type";
// import type { SerializedTree } from "./DirectedTreeGraph";
// import { TPredicateNode } from "../common/type";
export default QueryPredicateTreeProvider;

export { GabbyQueryProtocolContext };

// TODO - is this necessary.  It was necessary to import tree
//       in external project.  Is it defined somewhere else
// type TSerializedQuery = TSerializedPredicateTree;
export type {
  TGabbyQueryProtocolContextType,
  // SerializedTree as TSerializedTree,
  // TSerializedQuery,
};
