/* eslint-disable import/prefer-default-export */
import React from "react";
import { GabbyQueryProtocolContext, TGabbyQueryProtocolContextType } from "../context";

export const useProjectionSubjects = () => {
  const {
    addProjectionItem,
    getOrderedProjectionList,
    removeProjectionItem,
    projection,
  } = React.useContext(GabbyQueryProtocolContext) as TGabbyQueryProtocolContextType;

  return {
    addProjectionItem,
    projectionList: getOrderedProjectionList,

    projectableSubjects: projection.getProjectableSubjectsDictionary(),
    removeProjectionItem,
  };
};
