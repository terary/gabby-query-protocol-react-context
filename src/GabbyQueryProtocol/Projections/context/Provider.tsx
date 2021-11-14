/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
import * as React from "react";
import type {
  IProjectionEditor,
  TProjectionDictionary,
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
} from "gabby-query-protocol-projection";

import type { TProjectionContextType } from "./type";
import { TProjectionItemProperties } from "gabby-query-protocol-projection/dist/ProjectionEditor";

const Context = React.createContext<TProjectionContextType | null>(null);

type Props = {
  children?: React.ReactNode;
  projectionEditor: IProjectionEditor;
};

const ContextProvider = ({
  children,
  //  onChange = noop,
  projectionEditor,
}: //  operatorLabels = defaultOperatorLabels,
Props): JSX.Element => {
  //

  const [currentProjection, setCurrentProjection] = React.useState<TProjectionDictionary>(
    projectionEditor.getProjectionOrderByColumPosition()
  );

  // private (not exported)
  const updateProjectionState = () => {
    setCurrentProjection(projectionEditor.getProjectionOrderByColumPosition());
  };

  // **************************************     projection
  const addProjectionItem = (projectionSubject: TProjectionProperties): string => {
    // TODO - tmc - I think keys will change I think the getByOrder...
    //        rekeys? the keys should remain the same but this will return {newKey:{sameKey:properties}}
    //        ** MAYBE, I THINK **

    const newProjectionKey = projectionEditor.addSubject(projectionSubject);
    updateProjectionState();

    return newProjectionKey;
  };

  const getProjectionItem = (projectionKey: string) => {
    return projectionEditor.getProjectionSubject(projectionKey);
  };

  const getOrderedProjectionList = () => {
    return projectionEditor.getProjectionOrderByColumPosition();
  };

  const removeProjectionItem = (projectionKey: string): void => {
    projectionEditor.removeProjectionSubject(projectionKey);
    updateProjectionState();
  };

  const makeDefaultProjectionItem = (): TProjectionItemProperties => {
    const subjectDictionary = projectionEditor.getProjectableSubjectsDictionary();
    const justSomeSubjectId = subjectDictionary.getSubjectIds().shift();
    if (!justSomeSubjectId) {
      throw new Error("Found no subject id in Subject Dictionary");
    }

    const justSomeSubject = subjectDictionary.getSubjectById(justSomeSubjectId);
    // I dont think this is possible
    // if (!justSomeSubject) {
    //   throw new Error("Found no subjects in Subject Dictionary");
    // }

    return {
      subjectId: justSomeSubjectId,
      label: justSomeSubject.defaultLabel,
      columnOrder: 0,
      sortOrder: 0,
    };
  };

  const updateProjectionSubject = (
    projectionKey: string,
    updateProps: TProjectionPropertiesUpdatable
  ) => {
    projectionEditor.updateSubject(projectionKey, updateProps);
    updateProjectionState();
  };

  const exportedProperties = {
    addProjectionItem,
    getOrderedProjectionList,
    getProjectionItem,
    makeDefaultProjectionItem,
    projectionEditor,
    removeProjectionItem,
    updateProjectionSubject,
  };

  return <Context.Provider value={exportedProperties}>{children}</Context.Provider>;
};

// export default GQPProjectionContextProvider;

const ProjectionContext = {
  context: Context as React.Context<TProjectionContextType>,
  Provider: ContextProvider,
};

export { ProjectionContext };
