/* eslint-disable import/prefer-default-export */
import React from "react";
// import type { TProjectionPropertiesUpdatable } from "gabby-query-protocol-lib";
import type { TProjectionPropertiesUpdatable } from "gabby-query-protocol-projection";
// import { GabbyQueryProtocolContext, TGabbyQueryProtocolContextType } from "../context";
import { GQPProjectionContext, TGQProjectionContextType } from "../context";

export const useProjectionSubjectProperties = (projectionKey: string) => {
  const { getProjectionItem, updateProjectionSubject } = React.useContext(
    GQPProjectionContext
  ) as TGQProjectionContextType;

  const updateSubject = (updateProps: TProjectionPropertiesUpdatable) => {
    updateProjectionSubject(projectionKey, updateProps);
  };

  return {
    projectedSubject: getProjectionItem(projectionKey),
    updateProjectionSubject: updateSubject,
  };
};
