/* eslint-disable import/prefer-default-export */
import { TProjectionItemPropertyName } from "gabby-query-protocol-projection";
import React from "react";
import { GQPProjectionContext, TGQProjectionContextType } from "../context";

export const useProjectionSubjects = () => {
  const {
    addProjectionItem,
    getOrderedProjectionList,
    makeDefaultProjectionItem,
    projectionEditor,
    removeProjectionItem,
    updateProjectionSubject,
  } = React.useContext(GQPProjectionContext) as TGQProjectionContextType;
  return {
    addProjectionItem,
    getColumnOrderedProjectionDictionary: getOrderedProjectionList,
    getProjectableSubjectDictionary: () => {
      return projectionEditor.getProjectableSubjectsDictionary();
    },
    getProjectionOrderByProperty: (propertyName: TProjectionItemPropertyName) => {
      return projectionEditor.getProjectionOrderByProperty(propertyName);
    },
    getProjectedSubject: (projectionId: string) => {
      return projectionEditor.getProjectionSubject(projectionId);
    },

    makeDefaultProjectionItem,
    moveToColumnPosition: (projectionKey: string, columnPosition: number) => {
      Object.entries(getOrderedProjectionList()).forEach(([key, projection], idx) => {
        if (projection.columnOrder >= columnPosition) {
          projection.columnOrder++;
        } else if (projection.columnOrder < columnPosition) {
          projection.columnOrder--;
        }
      });
      updateProjectionSubject(projectionKey, { columnOrder: columnPosition });
    },
    normalizeIndexes: () => {
      Object.keys(getOrderedProjectionList()).forEach((projectionKey, idx) => {
        updateProjectionSubject(projectionKey, { columnOrder: idx });
      });
    },
    projectableSubjects: projectionEditor.getProjectableSubjectsDictionary(),
    projectionAsJson: projectionEditor.toJson(),
    getProjectionAsJson: () => {
      return projectionEditor.toJson();
    },

    removeProjectionItem,
    updateSubjectColumnPosition: (projectionKey: string, newColumnPosition: number) => {
      updateProjectionSubject(projectionKey, { columnOrder: newColumnPosition });
    },
  };
};
