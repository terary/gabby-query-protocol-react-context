import { renderHook, act } from "@testing-library/react-hooks";

import { TPredicateProperties, TSerializedPredicateTree } from "gabby-query-protocol-lib";
import { useJunctionProperties, IUseJunctionProperties } from "../hooks/useJunctionProperties";
import {
  predicateIds,
  fixedTreeJson,
  buildContextWrapper,
  predicateFormulaEditor,
} from "./test-helpers";

const ContextWrapper = buildContextWrapper(fixedTreeJson as TSerializedPredicateTree);

const aLeafPredicateId = "testTree:0";

describe("useJunctionProperties", () => {
  describe(".appendPredicate", () => {
    it("Should append a new predicate to the junction.", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      act(() => {
        const newPredicateId = (result.current as IUseJunctionProperties).appendPredicate({
          operator: "$eq",
          subjectId: "firstname",
          value: "NEW_PREDICATE_VALUE",
        });
        expect(newPredicateId).toStrictEqual("testTree:4");
      });
    });
    it("Should throw error if parent does not exist", () => {
      // we test success/fail - the leaf-to-branch conversion is done at a different level than this code
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: "DOES_NOT_EXIST",
        wrapper: ContextWrapper,
      });
      act(() => {
        const shouldThrow = () => {
          (result.current as IUseJunctionProperties).appendPredicate({
            operator: "$eq",
            subjectId: "firstname",
            value: "NEW_PREDICATE_VALUE",
          });
        };
        // keep this generic throw until predicateTree issue resolve.
        expect(shouldThrow).toThrow();
      });
    });
  }); // describe(".getChildrenIds
  describe(".getChildrenIds", () => {
    it("Should childrenIds for given predicateId", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      const childrenIds = (result.current as IUseJunctionProperties).getChildrenIds();
      expect(childrenIds).toStrictEqual([
        "testTree:0",
        "testTree:1",
        "testTree:2",
        "testTree:3",
      ]);
    });
  }); //   describe(".getChildrenIds", () => {
  describe(".getChildIdsOf", () => {
    it("Should return empty array for leaf nodes", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      const childrenIds = (result.current as IUseJunctionProperties).getChildIdsOf(
        aLeafPredicateId
      );
      expect(childrenIds).toStrictEqual([]);
    });
  }); // describe(".getChildIdsOf",
  describe(".getPredicateById", () => {
    it("Should return null if predicateId does not exist", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      const childrenIds = (result.current as IUseJunctionProperties).getPredicateById(
        "DOES_NOT_EXIST"
      );
      expect(childrenIds).toBeNull();
    });
  });

  describe(".getJunctionProperties", () => {
    it("Should get predicate properties (junction operator and childrenIds)", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      const childrenIds = (result.current as IUseJunctionProperties).getJunctionProperties();
      expect(childrenIds).toStrictEqual({
        operator: "$and",
        childrenIds: ["testTree:0", "testTree:1", "testTree:2", "testTree:3"],
      });
    });
    it("Should throw if initial predicateId does not exist", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: "DOES_NOT_EXIST",
        wrapper: ContextWrapper,
      });
      const willThrow = () =>
        (result.current as IUseJunctionProperties).getJunctionProperties();
      expect(willThrow).toThrow();
    });
    it("Should throw if initial predicate is not branch (junction)", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: aLeafPredicateId,
        wrapper: ContextWrapper,
      });
      const willThrow = () =>
        (result.current as IUseJunctionProperties).getJunctionProperties();
      expect(willThrow).toThrow();
    });
  }); //describe(".getPredicateProperties"

  describe(".isBranchNode", () => {
    it("Should be true for junction/branch)", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      expect((result.current as IUseJunctionProperties).isBranchNode).toBe(true);
    });
  }); //describe(".isBranchNode"
  describe(".isRoot", () => {
    it("Should be true for root)", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      expect((result.current as IUseJunctionProperties).isRoot).toBe(true);
    });
  }); //describe(".isRoot"

  describe(".removeCurrentPredicateJunction", () => {
    it("Should remove a junction", () => {
      //  setup
      const newChildPredicate: TPredicateProperties = {
        subjectId: "firstname",
        operator: "$eq",
        value: "value of new child",
      };

      // maybe need to create helper 'createTreeJson' to do this. Concerned about changes to predicateFormulaEditor.predicateTree
      predicateFormulaEditor.predicateTree.appendPredicate(
        predicateIds.child0,
        newChildPredicate
      );

      const MultiBranchContext = buildContextWrapper(
        predicateFormulaEditor.predicateTree.toJson()
      );

      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: "testTree:1", // predicateIds.child0, //predicateIds.root,
        wrapper: MultiBranchContext, // ContextWrapper,
      });

      const { removeCurrentPredicateJunction, getChildIdsOf } =
        result.current as IUseJunctionProperties;

      // preConditions
      const childrenOfRoot = getChildIdsOf("testTree");
      expect(childrenOfRoot).toStrictEqual([
        "testTree:0",
        "testTree:1", // branch that is not root (this junction)
        "testTree:4",
        "testTree:5",
      ]);

      // exercise
      act(() => {
        removeCurrentPredicateJunction();

        // postConditions
        const childrenOfRootAfter = getChildIdsOf("testTree");
        expect(childrenOfRootAfter).toStrictEqual([
          "testTree:0",
          // "testTree:1",
          "testTree:4",
          "testTree:5",
        ]);
      });
    });
  }); //describe(".removePredicateJunction"
  describe(".setConjunction .setDisjunction", () => {
    it("Should return a new predicate with empty children", () => {
      const { result } = renderHook((predicateId) => useJunctionProperties(predicateId), {
        initialProps: predicateFormulaEditor.rootNodeId,
        wrapper: ContextWrapper,
      });
      const { setDisjunction, setConjunction, getJunctionProperties } =
        result.current as IUseJunctionProperties;

      // preCondition
      expect(getJunctionProperties().operator).toBe("$and");

      // exercise/postCondition 1
      act(() => {
        setDisjunction();
        expect(getJunctionProperties().operator).toBe("$or");
      });

      // exercise/postCondition 2
      act(() => {
        setConjunction();
        expect(getJunctionProperties().operator).toBe("$and");
      });
    });
  }); //describe(".setConjunction"
});
