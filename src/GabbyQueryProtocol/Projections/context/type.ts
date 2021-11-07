import type {
  // TProjectionProperties,
  TProjectionPropertiesUpdatable,
  TProjectionDictionary,
  IProjectionEditor,
} from "gabby-query-protocol-projection";
import { TProjectionItemProperties } from "gabby-query-protocol-projection/dist/ProjectionEditor";

export type TProjectionContextType = {
  // projection
  addProjectionItem: (projectionItem: TProjectionItemProperties) => string;
  getOrderedProjectionList: () => TProjectionDictionary;
  getProjectionItem: (projectionKey: string) => TProjectionItemProperties;
  makeDefaultProjectionItem: () => TProjectionItemProperties;
  projectionEditor: IProjectionEditor;
  removeProjectionItem: (projectionKey: string) => void;
  updateProjectionSubject: (
    projectionKey: string,
    updateProps: TProjectionPropertiesUpdatable
  ) => void;
};
