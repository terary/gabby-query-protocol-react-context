/* eslint-disable import/prefer-default-export */
import React from "react";
import type { TProjectionPropertiesUpdatable } from "gabby-query-protocol-projection";
// import { GQPProjectionContext, TGQProjectionContextType } from "../context";
import { ProjectionContext } from "../context";
import type { TProjectionContextType } from "../context";

export const useProjectionSubjectProperties = (projectionKey: string) => {
  const { getProjectionItem, updateProjectionSubject } = React.useContext(
    ProjectionContext.context
  ) as TProjectionContextType;
  const updateSubject = (updateProps: TProjectionPropertiesUpdatable) => {
    updateProjectionSubject(projectionKey, updateProps);
  };

  return {
    projectedSubject: getProjectionItem(projectionKey),
    updateProjectionSubject: updateSubject,
  };
};
