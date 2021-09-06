/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

import {
  IPredicateSubjectDictionary,
  PredicateFormulaEditor,
  PredicateFormulaEditorFactory,
} from "gabby-query-protocol-lib";

import {
  TProjectableSubjectPropertiesJson,
  ProjectionEditorFactory,
  TProjectableSubjectsDictionaryJson,
} from "gabby-query-protocol-projection";
import type { TProjectionPropertiesJson } from "gabby-query-protocol-projection";
import type { TGabbyAssetsJson, TGabbyAssets } from "./type";
import { defaultOperatorLabels } from "../GabbyQueryProtocolContext/context/defaultOpLabels";

export const GabbyAssetFactory = {
  //
  fromJson: (resourcesJson: TGabbyAssetsJson): TGabbyAssets => {
    //
    const formulaEditorOptions = { newRootId: resourcesJson.newRootId };
    let formulaEditor: PredicateFormulaEditor;

    if (resourcesJson.predicateTreeJson) {
      formulaEditor = PredicateFormulaEditorFactory.fromJson(
        {
          predicateTreeJson: resourcesJson.predicateTreeJson,
          subjectDictionaryJson: resourcesJson.subjectDictionaryJson,
        },
        formulaEditorOptions
      );
    } else {
      formulaEditor = PredicateFormulaEditorFactory.fromEmpty(
        resourcesJson.subjectDictionaryJson,
        formulaEditorOptions
      );
      // I think maybe need to set root predicate?
    }

    const projectableSubjectJson =
      resourcesJson.projectableSubjectsJson ||
      makeProjectableSubject(formulaEditor.subjectDictionary);

    const projectionJson =
      resourcesJson.projectionJson || makeProjection(projectableSubjectJson);

    const projectionEditor = ProjectionEditorFactory.fromJson({
      projectionItemsJson: projectionJson,
      projectableSubjectDictionaryJson: projectableSubjectJson,
    });

    return {
      predicateFormulaEditor: formulaEditor,
      projectionEditor,
      operatorLabels: resourcesJson.operatorLabelsJson || defaultOperatorLabels,
    };
  },
};

const makeProjection = (
  projectableJson: TProjectableSubjectsDictionaryJson
): TProjectionPropertiesJson[] => {
  //
  return Object.entries(projectableJson).map(([subjectId, projectionProps], idx) => {
    return {
      subjectId,
      sortOrder: 1,
      columnOrder: idx,
      label: projectionProps.defaultLabel || subjectId,
    };
  });
};

const makeProjectableSubject = (
  predicateSubjectDictionary: IPredicateSubjectDictionary
): TProjectableSubjectsDictionaryJson => {
  const projectableSubject: TProjectableSubjectsDictionaryJson = {};
  predicateSubjectDictionary.getColumns().forEach((column) => {
    projectableSubject[column.subjectId] = {
      isSortable: true,
      datatype: column.datatype,
      defaultLabel: column.defaultLabel,
    } as TProjectableSubjectPropertiesJson;
  });
  return projectableSubject;
};
