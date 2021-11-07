import {
  IPredicateSubjectDictionary,
  TPredicatePropertiesArrayValue,
} from "gabby-query-protocol-lib";

import type {
  TPredicateNode,
  TPredicateProperties,
  TPredicatePropertiesJunction,
  TSerializedPredicateTree,
} from "gabby-query-protocol-lib";

import { TPredicateOperatorLabels } from "../type";

export type TPredicateFormulaEditorContextType = {
  appendPredicate: (parentNodeId: string, node: TPredicateProperties) => string;

  getChildrenIds: (predicateId: string) => string[];
  getJunctionById: (predicateId: string) => TPredicatePropertiesJunction;
  getLeafIdsAll: () => string[];
  getPredicateById: (predicateId: string) => TPredicateNode | null;
  getPredicateLeafById: (
    predicateId: string
  ) => TPredicateProperties | TPredicatePropertiesArrayValue;
  getPredicateTreeAsJson: () => TSerializedPredicateTree;
  isBranchNode: (predicateId: string) => boolean;
  isRoot: (predicateId: string) => boolean;
  makeEmptyPredicate: () => TPredicateProperties;
  operatorLabels: TPredicateOperatorLabels;

  removePredicate: (predicateId: string) => void;
  setConjunction: (predicateId: string) => void;
  setDisjunction: (predicateId: string) => void;
  subjectDictionary: IPredicateSubjectDictionary;
  updatePredicate: (predicateId: string, node: TPredicateNode) => void;
};
