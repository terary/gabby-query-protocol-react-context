/* eslint-disable import/no-extraneous-dependencies */
import { IPredicateSubjectDictionary } from "gabby-query-protocol-lib";
import type {
  TPredicateNode,
  TPredicateProperties,
  TPredicatePropertiesJunction,
} from "gabby-query-protocol-lib";

import { IProjectionEditor } from "gabby-query-protocol-projection";
import type {
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
  TProjectionDictionary,
} from "gabby-query-protocol-projection";

import { TPredicateOperatorLabels } from "../type";

export type TGabbyQueryProtocolContextType = {
  appendPredicate: (parentNodeId: string, node: TPredicateProperties) => string;
  getChildrenIds: (predicateId: string) => string[];
  getJunctionById: (predicateId: string) => TPredicatePropertiesJunction;
  getPredicateById: (predicateId: string) => TPredicateNode | null;

  makeEmptyPredicate: () => TPredicateProperties;
  operatorLabels: TPredicateOperatorLabels;
  // projection: ProjectionManager;
  // projection: Projection;
  // projectionEditor: IProjectionEditor;

  removePredicate: (predicateId: string) => void;
  setConjunction: (predicateId: string) => void;
  setDisjunction: (predicateId: string) => void;
  subjectDictionary: IPredicateSubjectDictionary;
  updatePredicate: (predicateId: string, node: TPredicateNode) => void;

  // projection
  // getOrderedProjectionList: () => TProjectionDictionary;
  // getProjectionItem: (projectionKey: string) => TProjectionProperties;
  // addProjectionItem: (projectionItem: TProjectionProperties) => string;
  // removeProjectionItem: (projectionKey: string) => void;
  // updateProjectionSubject: (
  //   projectionKey: string,
  //   updateProps: TProjectionPropertiesUpdatable
  // ) => void;
};
