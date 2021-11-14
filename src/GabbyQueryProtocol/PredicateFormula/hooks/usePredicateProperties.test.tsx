import { TSerializedPredicateTree } from "gabby-query-protocol-lib";

import type { TPredicateProperties } from "gabby-query-protocol-lib";

import { renderHook, act } from "@testing-library/react-hooks";
import {
  usePredicateProperties,
  IUsePredicateProperties,
} from "../hooks/usePredicateProperties";

import {
  predicateIds,
  fixedTreeJson,
  buildContextWrapper,
  predicateFormulaEditor,
} from "./test-helpers";

const predicatePropertiesChild1 = {
  subjectId: "firstname",
  operator: "$eq",
  value: "valueOfChild0",
} as TPredicateProperties;

const aLeafPredicateId = "testTree:0";
const ContextWrapper = buildContextWrapper(fixedTreeJson as TSerializedPredicateTree);

describe("usePredicateProperties", () => {
  describe(".appendPredicate", () => {
    it("Should append a new predicate to the junction.", () => {
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      act(() => {
        const newPredicateId = (result.current as IUsePredicateProperties).appendPredicate({
          operator: "$eq",
          subjectId: "firstname",
          value: "NEW_PREDICATE_VALUE",
        });
        expect(newPredicateId).toStrictEqual("testTree:4");
      });
    });
    it("Should append a new predicate on leaf (converting leaf to branch append to new branch)", () => {
      // we test success/fail - the leaf-to-branch conversion is done at a different level than this code
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: aLeafPredicateId,
        wrapper: ContextWrapper,
      });
      act(() => {
        const newPredicateId = (result.current as IUsePredicateProperties).appendPredicate({
          operator: "$eq",
          subjectId: "firstname",
          value: "NEW_PREDICATE_VALUE",
        });
        expect(newPredicateId).toStrictEqual("testTree:0:5");
      });
    });
    it("Should throw error if parent does not exist", () => {
      // we test success/fail - the leaf-to-branch conversion is done at a different level than this code
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: "DOES_NOT_EXIST",
        wrapper: ContextWrapper,
      });
      const shouldThrow = () => {
        (result.current as IUsePredicateProperties).appendPredicate({
          operator: "$eq",
          subjectId: "firstname",
          value: "NEW_PREDICATE_VALUE",
        });
      };
      // keep this generic throw until predicateTree issue resolve (gabby-query-protocol-lib).
      // https://github.com/terary/gabby-query-protocol-lib/issues/33
      expect(shouldThrow).toThrow();
    });
  }); // describe appendPredicate
  describe(".getPredicateLeafProperties", () => {
    it("Should return properties of predicate and current subject", () => {
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: predicateIds.child2,
        wrapper: ContextWrapper,
      });

      const actualPredicateProperties = (
        result.current as IUsePredicateProperties
      ).getPredicateLeafProperties();

      // predicateFormulaEditor.rootNodeId,
      const expectedPredicateProperties = {
        subjectId: "firstname",
        operator: "$eq",
        value: "valueOfChild1",
      };

      const expectedSubjectProperties = {
        datatype: "string",
        defaultLabel: "First Name",
        subjectId: "firstname",
        validOperators: {
          $eq: true,
          $gt: true,
          $like: true,
        },
      };

      expect(actualPredicateProperties).toStrictEqual({
        predicateProperties: expectedPredicateProperties,
        subjectProperties: expectedSubjectProperties,
      });
    });
    it("Should throw if predicateId is not a leaf", () => {
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: predicateIds.root,
        wrapper: ContextWrapper,
      });

      const willThrow = () => {
        (result.current as IUsePredicateProperties).getPredicateLeafProperties();
      };

      expect(willThrow).toThrow("Couldn't locate leaf with id: 'testTree'");
    });
    it("Should throw if predicateId does not exist", () => {
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: "DOES_NOT_EXIST",
        wrapper: ContextWrapper,
      });

      const willThrow = () => {
        (result.current as IUsePredicateProperties).getPredicateLeafProperties();
      };

      expect(willThrow).toThrow("Couldn't locate leaf with id: 'DOES_NOT_EXIST'");
    });
  }); // describe('getPredicateLeafProperties'
  describe(".isRoot", () => {
    it("Should be false - for trees with more than one node", () => {
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: predicateIds.child2,
        wrapper: ContextWrapper,
      });

      const isRoot = (result.current as IUsePredicateProperties).isRoot;
      expect(isRoot).toBe(false);
    });
    it("Should be true - if tree has 1 node (root)", () => {
      const singleNodeTreeJson = {
        singleNodeTree: {
          parentId: null,
          payload: {
            subjectId: "firstname",
            operator: "$eq",
            value: "valueOfChild1",
          },
        },
      } as TSerializedPredicateTree;
      const ContextWrapperSingleNodeTree = buildContextWrapper(singleNodeTreeJson);

      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: "singleNodeTree",
        wrapper: ContextWrapperSingleNodeTree,
      });

      const isRoot = (result.current as IUsePredicateProperties).isRoot;
      expect(isRoot).toBe(true);
    });
  }); // describe('isRoot'

  describe(".removeCurrentPredicate", () => {
    it("Should return properties of predicate and current subject", () => {
      // setup
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: predicateIds.child1,
        wrapper: ContextWrapper,
      });

      const { removeCurrentPredicate, getPredicateById } =
        result.current as IUsePredicateProperties;

      // preCondition
      const thisPredicate = getPredicateById(predicateIds.child1);
      expect(thisPredicate).toStrictEqual(predicatePropertiesChild1);

      act(() => {
        // exercise
        removeCurrentPredicate();

        // postCondition
        const thisPredicatePost = getPredicateById(predicateIds.child1);
        expect(thisPredicatePost).toBeNull();
      });
    });
  }); // describe('removeCurrentPredicate'
  describe(".updateCurrentPredicate", () => {
    it("Should return properties of predicate and current subject", () => {
      // setup
      const propertyChanges = {
        subjectId: "lastname",
        operator: "$eq",
        value: "newValue",
      } as TPredicateProperties;

      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: predicateIds.child1,
        wrapper: ContextWrapper,
      });

      const { updateCurrentPredicate, getPredicateById } =
        result.current as IUsePredicateProperties;

      // preCondition
      const thisPredicatePre = getPredicateById(predicateIds.child1);
      expect(thisPredicatePre).not.toStrictEqual(propertyChanges);

      act(() => {
        // exercise
        updateCurrentPredicate(propertyChanges);

        // postCondition
        const thisPredicatePost = getPredicateById(predicateIds.child1);
        expect(thisPredicatePost).toStrictEqual(propertyChanges);
      });
    });
  }); // describe('updateCurrentPredicate'
  describe(".validatePredicateProperties", () => {
    it("Should return true for valid predicate properties", () => {
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: predicateIds.child1,
        wrapper: ContextWrapper,
      });

      const { validatePredicateProperties } = result.current as IUsePredicateProperties;

      const validationResult = validatePredicateProperties({
        subjectId: "firstname",
        operator: "$eq",
        value: "valueOfChild1",
      });
      expect(validationResult.hasError).toBe(false);
      expect(validationResult.errorMessages.length).toBe(0);
    });
    it("Should return false for invalid predicate properties", () => {
      const { result } = renderHook((predicateId) => usePredicateProperties(predicateId), {
        initialProps: predicateIds.child1,
        wrapper: ContextWrapper,
      });

      const { validatePredicateProperties } = result.current as IUsePredicateProperties;

      const validationResult = validatePredicateProperties({
        subjectId: "",
        operator: "$eq",
        value: "valueOfChild1",
      });
      expect(validationResult.hasError).toBe(true);
      expect(validationResult.errorMessages.length).toBeGreaterThan(0);
    });
  }); // describe('validatePredicateProperties'
});
