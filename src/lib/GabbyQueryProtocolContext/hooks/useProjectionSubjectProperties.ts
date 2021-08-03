/* eslint-disable import/prefer-default-export */
import React from "react";
import type { TProjectionPropertiesUpdatable } from "gabby-query-protocol-lib";
import { GabbyQueryProtocolContext, TGabbyQueryProtocolContextType } from "../context";

export const useProjectionSubjectProperties = (projectionKey: string) => {
  const { getProjectionItem, updateProjectionSubject } = React.useContext(
    GabbyQueryProtocolContext
  ) as TGabbyQueryProtocolContextType;

  const updateSubject = (updateProps: TProjectionPropertiesUpdatable) => {
    updateProjectionSubject(projectionKey, updateProps);
  };

  return {
    projectedSubject: getProjectionItem(projectionKey),
    updateProjectionSubject: updateSubject,
  };
};
