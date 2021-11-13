import { renderHook, act } from "@testing-library/react-hooks";
import type { TProjectionPropertiesUpdatable } from "gabby-query-protocol-projection";

import type { TProjectionContextType, TProjectionItemProperties } from "../context";

import { useProjectionSubjects, IUseProjectionSubjects } from "../hooks/useProjectionSubjects";
import { buildContextWrapper, projectionEditor } from "./test-helpers";

const ContextWrapper = buildContextWrapper();

describe("useProjectionSubjects", () => {
  describe(".addProjectionItem", () => {
    it("Should projectedItem, returning key", () => {
      const { result } = renderHook(() => useProjectionSubjects(), {
        wrapper: ContextWrapper,
      });

      const projectionItem = {
        columnOrder: -1,
        sortOrder: 1,
        subjectId: "firstName",
        label: "The Label",
      } as TProjectionItemProperties;
      const { addProjectionItem, getProjectedItem } = result.current as IUseProjectionSubjects;

      // exercise
      act(() => {
        const newProjectionId = addProjectionItem(projectionItem);
        expect(getProjectedItem(newProjectionId)).toStrictEqual(projectionItem);
      });
    });
  }); //describe(".addProjectionItem"

  describe(".getProjectedItem", () => {
    it("Should getProjectedItem with key", () => {
      const { result } = renderHook(() => useProjectionSubjects(), {
        wrapper: ContextWrapper,
      });

      const projectionItem = {
        columnOrder: -1,
        sortOrder: 1,
        subjectId: "firstName",
        label: "The Label",
      } as TProjectionItemProperties;
      const { addProjectionItem, getProjectedItem } = result.current as IUseProjectionSubjects;

      // exercise
      act(() => {
        const newProjectionId = addProjectionItem(projectionItem);
        expect(getProjectedItem(newProjectionId)).toStrictEqual(projectionItem);
      });
    });
  }); //describe(".getProjectedItem"
  describe(".removeProjectionItem", () => {
    it("Should remove given projectedItem with key.", () => {
      const { result } = renderHook(() => useProjectionSubjects(), {
        wrapper: ContextWrapper,
      });

      const projectionItem = {
        columnOrder: -1,
        sortOrder: 1,
        subjectId: "firstName",
        label: "The Label",
      } as TProjectionItemProperties;
      const { addProjectionItem, getProjectedItem, removeProjectionItem } =
        result.current as IUseProjectionSubjects;

      act(() => {
        // setup
        const newProjectionId = addProjectionItem(projectionItem);

        // preCondition
        expect(getProjectedItem(newProjectionId)).toStrictEqual(projectionItem);

        // exercise
        removeProjectionItem(newProjectionId);

        // postCondition
        expect(getProjectedItem(newProjectionId)).toBe(null);
      });
    });
  }); //describe(".removeProjectionItem"
  describe(".updateProjectedItem", () => {
    it("Should update given projectedItem.", () => {
      const { result } = renderHook(() => useProjectionSubjects(), {
        wrapper: ContextWrapper,
      });

      const projectionItem: TProjectionItemProperties = {
        columnOrder: -1,
        sortOrder: 1,
        subjectId: "firstName",
        label: "The Label",
      };

      const changeProjectionItem: TProjectionPropertiesUpdatable = {
        columnOrder: 1,
        sortOrder: -1,
        label: "Change Label",
      };

      const expectedUpdatedProjectedItem = {
        ...changeProjectionItem,
        ...{ subjectId: projectionItem.subjectId },
      };

      const { addProjectionItem, getProjectedItem, updateProjectedItem } =
        result.current as IUseProjectionSubjects;

      act(() => {
        // setup
        const newProjectionId = addProjectionItem(projectionItem);

        // preCondition
        expect(getProjectedItem(newProjectionId)).toStrictEqual(projectionItem);

        // exercise
        updateProjectedItem(newProjectionId, changeProjectionItem);

        // postCondition
        expect(getProjectedItem(newProjectionId)).toStrictEqual(expectedUpdatedProjectedItem);
      });
    });
  }); //describe(".updateProjectedItem"
});
