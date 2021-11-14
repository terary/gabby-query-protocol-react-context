/* eslint-disable import/prefer-default-export */
import React from "react";
import type { TProjectionPropertiesUpdatable } from "gabby-query-protocol-projection";
import { ProjectionContext } from "../context";
import type { TProjectionContextType, TProjectionItemProperties } from "../context";

export interface IUseProjectionSubjects {
  addProjectionItem: (projectionItem: TProjectionItemProperties) => string;
  getProjectedItem: (projectionId: string) => TProjectionItemProperties;
  removeProjectionItem: (projectionKey: string) => void;
  updateProjectedItem: (
    projectionKey: string,
    updateProps: TProjectionPropertiesUpdatable
  ) => void;
}

export const useProjectionSubjects = (): IUseProjectionSubjects => {
  const {
    addProjectionItem,
    projectionEditor,
    removeProjectionItem,
    updateProjectionSubject,
  } = React.useContext(ProjectionContext.context) as TProjectionContextType;
  return {
    addProjectionItem,
    getProjectedItem: (projectionId: string) => {
      return projectionEditor.getProjectionSubject(projectionId) || null;
    },

    removeProjectionItem,
    updateProjectedItem: updateProjectionSubject,
  };
};
