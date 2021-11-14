import { renderHook } from "@testing-library/react-hooks";
import { EXAMPLE_JSON_BLUE_SKIES } from "gabby-query-protocol-projection";
import type { TProjectionItemProperties } from "../context";
import { useProjectionUtilities, IUseProjectionUtilities } from "./useProjectionUtilities";
import { buildContextWrapper } from "./test-helpers";

const ContextWrapper = buildContextWrapper();

describe("useProjectionUtilities", () => {
  describe(".getColumnOrderedProjectionDictionary", () => {
    it("Should return projection orderBy column position", () => {
      const { result } = renderHook(() => useProjectionUtilities(), {
        wrapper: ContextWrapper,
      });

      const { getColumnOrderedProjectionDictionary } =
        result.current as IUseProjectionUtilities;

      const orderedColumns = getColumnOrderedProjectionDictionary();
      const columnArray: TProjectionItemProperties[] = [];
      Object.entries(orderedColumns).forEach(([key, projectedItem], idx) => {
        columnArray[idx] = projectedItem;
      });

      let prevColumnPosition = columnArray[0].columnOrder;
      for (let i = 0; i < columnArray.length; i++) {
        expect(columnArray[i].columnOrder).toBeGreaterThanOrEqual(prevColumnPosition);
        prevColumnPosition = columnArray[i].columnOrder;
      }
    });
  }); //describe(".addProjectionItem"
  describe(".getProjectableSubjectDictionary", () => {
    it("Should return a dictionary of projectable subjects", () => {
      const { result } = renderHook(() => useProjectionUtilities(), {
        wrapper: ContextWrapper,
      });

      const { getProjectableSubjectDictionary } = result.current as IUseProjectionUtilities;

      const projectableSubjects = getProjectableSubjectDictionary();
      const expectedJson = EXAMPLE_JSON_BLUE_SKIES.projectableSubjectDictionaryJson;

      expect(Object.keys(projectableSubjects).length).toBeGreaterThan(0);
      expect(projectableSubjects.toJson()).toStrictEqual(expectedJson);
    });
  }); //describe('.getProjectableSubjectDictionary'
  describe(".makeDefaultProjectionItem", () => {
    it("Should return a default projection item", () => {
      const { result } = renderHook(() => useProjectionUtilities(), {
        wrapper: ContextWrapper,
      });

      const { makeDefaultProjectionItem } = result.current as IUseProjectionUtilities;

      const defaultProjectionItem = makeDefaultProjectionItem();
      const expectedProjectionItem: TProjectionItemProperties = {
        columnOrder: 0,
        label: "First Name",
        sortOrder: 0,
        subjectId: "firstname",
      };

      expect(defaultProjectionItem).toStrictEqual(expectedProjectionItem);
    });
  }); //describe('.makeDefaultProjectionItem'
  describe(".getProjectionAsJson", () => {
    it("Should return a projection as json", () => {
      const { result } = renderHook(() => useProjectionUtilities(), {
        wrapper: ContextWrapper,
      });

      const { getProjectionAsJson } = result.current as IUseProjectionUtilities;

      const projectionAsJson = getProjectionAsJson();
      const expectedProjectionAsJson = EXAMPLE_JSON_BLUE_SKIES.projectionJson;

      expect(projectionAsJson).toStrictEqual(expectedProjectionAsJson);
    });
  }); //describe('.getProjectionAsJson'
});
