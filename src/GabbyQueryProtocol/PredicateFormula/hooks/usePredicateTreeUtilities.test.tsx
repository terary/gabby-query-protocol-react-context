import * as React from "react";

import { renderHook } from "@testing-library/react-hooks";
import { TSerializedPredicateTree } from "gabby-query-protocol-lib";

import { defaultOperatorLabels } from "../defaultOpLabels";

import {
  usePredicateTreeUtilities,
  IUsePredicateTreeUtilities,
} from "../hooks/usePredicateTreeUtilities";

import { fixedTreeJson, buildContextWrapper, predicateFormulaEditor } from "./test-helpers";

const ContextWrapper = buildContextWrapper(fixedTreeJson as TSerializedPredicateTree);

describe("usePredicateTreeUtilities", () => {
  describe(".getPredicateTreeAsJson", () => {
    it("Should append a new predicate to the junction.", () => {
      const { result } = renderHook((predicateId) => usePredicateTreeUtilities(), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      const { getPredicateTreeAsJson } = result.current as IUsePredicateTreeUtilities;

      expect(getPredicateTreeAsJson()).toStrictEqual(fixedTreeJson);
    });
  }); // describe("getPredicateTreeAsJson")
  describe(".getSubjectById", () => {
    it("Should get Predicate Subject by Id.", () => {
      const expectedSubject = {
        datatype: "string",
        defaultLabel: "First Name",
        subjectId: "firstname",
        validOperators: {
          $eq: true,
          $gt: true,
          $like: true,
        },
      };
      const { result } = renderHook(() => usePredicateTreeUtilities(), {
        wrapper: ContextWrapper,
      });
      const { getSubjectById } = result.current as IUsePredicateTreeUtilities;

      expect(getSubjectById("firstname")).toStrictEqual(expectedSubject);
    });
  }); // describe(" getSubjectById")
  describe(".operatorLabels", () => {
    it("Should return an array of operator labels", () => {
      const { result } = renderHook(() => usePredicateTreeUtilities(), {
        wrapper: ContextWrapper,
      });
      const operatorLabels = (result.current as IUsePredicateTreeUtilities).operatorLabels;
      expect(operatorLabels).toStrictEqual(defaultOperatorLabels);
    });
  }); //describe(".operatorLabels"
  describe(".subjectDictionary", () => {
    it("Should return properties of predicate and current subject", () => {
      const { result } = renderHook(() => usePredicateTreeUtilities(), {
        wrapper: ContextWrapper,
      });

      const subjectDictionary = (result.current as IUsePredicateTreeUtilities)
        .subjectDictionary;

      expect(subjectDictionary).toStrictEqual(predicateFormulaEditor.subjectDictionary);
    });
  }); // describe('subjectDictionary'
  describe(".getSelectOptions", () => {
    it("Should get value/labe options for a given subjectId/operator", () => {
      const expectedOptionsRegionList = [
        {
          label: "US West",
          value: "US-WEST",
        },
        {
          label: "US East",
          value: "US-EAST",
        },
        {
          label: "US South",
          value: "US-SOUTH",
        },
        {
          label: "US North",
          value: "US-NORTH",
        },
      ];

      const { result } = renderHook(() => usePredicateTreeUtilities(), {
        wrapper: ContextWrapper,
      });
      const { getSelectOptions } = result.current as IUsePredicateTreeUtilities;

      expect(getSelectOptions("region", "$anyOf")).toStrictEqual(expectedOptionsRegionList);
    });
    it("Should return empty array (not error) for invalid parameters", () => {
      const { result } = renderHook(() => usePredicateTreeUtilities(), {
        wrapper: ContextWrapper,
      });
      const { getSelectOptions } = result.current as IUsePredicateTreeUtilities;

      expect(getSelectOptions("firstname", "$anyOf")).toStrictEqual([]);
      expect(getSelectOptions("region", "$eq")).toStrictEqual([]);
    });
  }); // describe("getSelectOptions")

  describe(".testIsBranchNode", () => {
    it("Should be true for junction/branch)", () => {
      const { result } = renderHook(() => usePredicateTreeUtilities(), {
        wrapper: ContextWrapper,
      });
      const { testIsBranchNode } = result.current as IUsePredicateTreeUtilities;
      expect(testIsBranchNode("testTree")).toBe(true);
      expect(testIsBranchNode("DOES_NOT_EXIST")).toBe(false);
      expect(testIsBranchNode("testTree:0")).toBe(false);
    });
  }); //describe(".testIsBranchNode"
});
