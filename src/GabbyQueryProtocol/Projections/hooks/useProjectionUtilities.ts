/* eslint-disable import/prefer-default-export */
import React from "react";
import type {
  TProjectionDictionary,
  IProjectableSubjectDictionary,
} from "gabby-query-protocol-projection";
import { ProjectionContext } from "../context";
import type { TProjectionContextType, TProjectionItemProperties } from "../context";

export interface IUseProjectionUtilities {
  getColumnOrderedProjectionDictionary: () => TProjectionDictionary;
  getProjectableSubjectDictionary: () => IProjectableSubjectDictionary;
  makeDefaultProjectionItem: () => TProjectionItemProperties;
  getProjectionAsJson: () => TProjectionItemProperties[];
}

export const useProjectionUtilities = (): IUseProjectionUtilities => {
  const { getOrderedProjectionList, makeDefaultProjectionItem, projectionEditor } =
    React.useContext(ProjectionContext.context) as TProjectionContextType;
  return {
    getColumnOrderedProjectionDictionary: getOrderedProjectionList,
    getProjectableSubjectDictionary: () => {
      return projectionEditor.getProjectableSubjectsDictionary();
    },
    makeDefaultProjectionItem,
    getProjectionAsJson: () => {
      return projectionEditor.toJson();
    },
  };
};
