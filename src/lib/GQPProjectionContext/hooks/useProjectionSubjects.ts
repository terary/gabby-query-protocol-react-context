/* eslint-disable import/prefer-default-export */
import { TProjectionItemPropertyName } from "gabby-query-protocol-projection";
import React from "react";
import { GQPProjectionContext, TGQProjectionContextType } from "../context";

export const useProjectionSubjects = () => {
  const {
    addProjectionItem,
    getOrderedProjectionList,
    removeProjectionItem,
    projectionEditor,
  } = React.useContext(GQPProjectionContext) as TGQProjectionContextType;
  return {
    addProjectionItem,
    getColumnOrderedProjectionDictionary: getOrderedProjectionList,
    getProjectionOrderByProperty: (propertyName: TProjectionItemPropertyName) => {
      return projectionEditor.getProjectionOrderByProperty(propertyName);
    },
    // getSubjectOrderedProjectionDictionary: projectionEditor.getSubProjectionBySubjectId,

    projectionAsJson: projectionEditor.toJson(),
    projectableSubjects: projectionEditor.getProjectableSubjectsDictionary(),
    removeProjectionItem,
  };
};
