import type {
  TProjectionProperties,
  TProjectionPropertiesUpdatable,
  TProjectionDictionary,
  IProjectionEditor,
} from "gabby-query-protocol-projection";

export type TGQProjectionContextType = {
  // projection
  getOrderedProjectionList: () => TProjectionDictionary;
  getProjectionItem: (projectionKey: string) => TProjectionProperties;
  addProjectionItem: (projectionItem: TProjectionProperties) => string;
  removeProjectionItem: (projectionKey: string) => void;
  projectionEditor: IProjectionEditor;
  updateProjectionSubject: (
    projectionKey: string,
    updateProps: TProjectionPropertiesUpdatable
  ) => void;
};
