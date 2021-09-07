import {
  PredicateFormulaEditor,
  PredicateFormulaEditorJson,
} from "gabby-query-protocol-lib";

import type {
  TPredicateSubjectDictionaryJson,
  TSerializedPredicateTree,
} from "gabby-query-protocol-lib";

import {
  IProjectionEditor,
  TProjectionProperties,
} from "gabby-query-protocol-projection";
import type {
  TProjectionPropertiesJson,
  TProjectableSubjectsDictionaryJson,
} from "gabby-query-protocol-projection";

import { TPredicateOperatorLabels } from "../GabbyQueryProtocolContext/type";

export type TGabbyAssets = {
  predicateFormulaEditor: PredicateFormulaEditor;
  projectionEditor: IProjectionEditor;
  operatorLabels: TPredicateOperatorLabels;
};

export type TGabbyAssetsJson = {
  subjectDictionaryJson: TPredicateSubjectDictionaryJson;
  predicateTreeJson?: TSerializedPredicateTree;
  projectionJson?: TProjectionPropertiesJson[];
  projectableSubjectsJson?: TProjectableSubjectsDictionaryJson;
  operatorLabelsJson?: TPredicateOperatorLabels;
  newRootId?: string;
};
export type TGabbyQueryUpdatedDocuments = {
  projection: TProjectionProperties[];
  predicateFormula: PredicateFormulaEditorJson;
};
