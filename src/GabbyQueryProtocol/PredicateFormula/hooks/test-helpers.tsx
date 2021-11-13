import * as React from "react";
import {
  PredicateFormulaEditorFactory,
  TPredicateSubjectDictionaryJson,
  TSerializedPredicateTree,
} from "gabby-query-protocol-lib";

import type { TPredicateProperties } from "gabby-query-protocol-lib";
import { PredicateFormulaEditorContext } from "../context/Provider";
import subjectsDocumentJson from "../../test-data/test-predicate-subject-dictionary.json";

const predicateIds: { [predicateName: string]: string } = {};
const predicateFormulaEditor = PredicateFormulaEditorFactory.fromEmpty(
  subjectsDocumentJson as TPredicateSubjectDictionaryJson,
  { newRootId: "testTree" }
);

predicateIds.root = predicateFormulaEditor.rootNodeId;
predicateIds.child0 = predicateFormulaEditor.predicatesAppend(
  predicateFormulaEditor.rootNodeId,
  {
    subjectId: "firstname",
    operator: "$eq",
    value: "Component Default Tree",
  }
);

const predicatePropertiesChild1 = {
  subjectId: "firstname",
  operator: "$eq",
  value: "valueOfChild0",
} as TPredicateProperties;

predicateIds.child1 = predicateFormulaEditor.predicatesAppend(
  predicateFormulaEditor.rootNodeId,
  predicatePropertiesChild1
);

predicateIds.child2 = predicateFormulaEditor.predicatesAppend(
  predicateFormulaEditor.rootNodeId,
  {
    subjectId: "firstname",
    operator: "$eq",
    value: "valueOfChild1",
  }
);

const fixedTreeJson = predicateFormulaEditor.toJson().predicateTreeJson;
// @ts-ignore - bug work around.  Validator should reject but validator not ran on root (initial) node
fixedTreeJson["testTree:0"].payload.value = "Some value";
Object.freeze(fixedTreeJson);

interface Props {
  children?: React.ReactNode;
}

const buildContextWrapper = (predicateTreeJson: TSerializedPredicateTree) => {
  return function ContextWrapperSingleNodeTree({ children }: Props) {
    // children are necessary for tests to run
    const testPredicateFormulaEditor = PredicateFormulaEditorFactory.fromJson({
      predicateTreeJson,

      subjectDictionaryJson: subjectsDocumentJson as TPredicateSubjectDictionaryJson,
    });

    return (
      <PredicateFormulaEditorContext.Provider
        predicateFormulaEditor={testPredicateFormulaEditor}
      >
        {children}
      </PredicateFormulaEditorContext.Provider>
    );
  };
};

export { buildContextWrapper, fixedTreeJson, predicateIds, predicateFormulaEditor };
