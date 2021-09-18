/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */

import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  PredicateFormulaEditor,
  PredicateFormulaEditorFactory,
  TPredicateSubjectDictionaryJson,
  TPredicateProperties,
} from "gabby-query-protocol-lib";
import {
  Projection,
  ProjectableDictionaryFactory,
} from "gabby-query-protocol-projection";
import type { TProjectableSubjectsDictionaryJson } from "gabby-query-protocol-projection";

import { useJunctionProperties, usePredicateProperties } from ".";

import PredicateTreeProvider from "../context";
import subjectsDocumentJson from "../../test-resources/test-subject-document.json";
import * as projectableSubjectsJson from "../../test-resources/test-projectable-fields.json";
import * as blueSky from "../../test-resources/test-projection-flat-file.json";

// const subjectDictionary = PredicateSubjectDictionary.fromJson(subjectsDocumentJson);

const formulaEditor = PredicateFormulaEditorFactory.fromEmpty(
  subjectsDocumentJson as TPredicateSubjectDictionaryJson
);
const projectableSubjects = ProjectableDictionaryFactory.fromJson(
  projectableSubjectsJson.projectableSubjects as TProjectableSubjectsDictionaryJson
);

const contextProjection = Projection.fromFlatFile(
  blueSky.projection,
  projectableSubjects
);

formulaEditor.predicatesReplace(formulaEditor.rootNodeId, {
  subjectId: "firstname",
  operator: "$eq",
  value: "Component Default Tree",
});

const childNode1 = formulaEditor.predicatesAppend(formulaEditor.rootNodeId, {
  subjectId: "firstname",
  operator: "$gt",
  value: "Component Default Tree",
});

interface Props {
  predicateFormulaEditor?: PredicateFormulaEditor;
  children?: JSX.Element;
}

function QueryContainer({ predicateFormulaEditor = formulaEditor, children }: Props) {
  return (
    <PredicateTreeProvider
      predicateFormulaEditor={predicateFormulaEditor}
      // projectionEditor={contextProjection}
    >
      {children}
    </PredicateTreeProvider>
  );
}
describe("usePredicateProperties", () => {
  it("Should return necessary properties and nothing more", () => {
    // here to satisfy coverage.  These function are tested elsewhere.
    // useJunctionNodeProperties are wrappers for underlying functions

    const MyInjector = () => {
      const predicateMethods = usePredicateProperties("nodeId");
      expect(typeof predicateMethods.appendPredicate).toBe("function");
      expect(typeof predicateMethods.makeEmptyPredicate).toBe("function");
      expect(typeof predicateMethods.operatorLabels).toBe("object");
      expect(typeof predicateMethods.queryPredicate).toBe("object");
      expect(typeof predicateMethods.removeMe).toBe("function");
      expect(typeof predicateMethods.updateMe).toBe("function");
      expect(typeof predicateMethods.validatePredicateProperties).toBe("function");

      expect(Object.keys(predicateMethods).length).toBe(7);

      expect(predicateMethods.queryPredicate).toBeNull();
      expect(predicateMethods.appendPredicate).toThrow(
        /appendPredicate, predicate failed validation/i
      );
      expect(predicateMethods.removeMe).toThrow(/does not exist/);
      // expect(predicateMethods.updateMe).toThrow('setPayload: node not found "nodeId"');
      return <span>dummy text to make sense of this world</span>;
    };

    render(
      <QueryContainer>
        <MyInjector />
      </QueryContainer>
    );
  });
  it("Should set conjunction/disjunction", () => {
    const newValue = "update test";
    const MyInjector = () => {
      const predicateMethods = usePredicateProperties(childNode1);
      const { queryPredicate } = predicateMethods;
      const handleUpdatePredicate = () => {
        const newPredicate: TPredicateProperties = {
          ...queryPredicate,
          ...{ value: newValue },
        };

        predicateMethods.updateMe(newPredicate);
      };
      return (
        <div>
          <p>
            <button type="button" onClick={handleUpdatePredicate}>
              Update
            </button>
            Predicate: {JSON.stringify(queryPredicate)}
            <span>value: {queryPredicate.value}</span>
          </p>
        </div>
      );
    };

    render(
      <QueryContainer>
        <MyInjector />
      </QueryContainer>
    );
    // preCondition
    const preconditionText = "value: Component Default Tree";
    expect(screen.queryByText(preconditionText)).toBeInTheDocument();

    // exercise  - set disjunction
    const disjunctionButton = screen.getByText("Update");
    fireEvent.click(disjunctionButton);

    // post condition
    const disjunctionText = "value: update test";
    expect(screen.queryByText(disjunctionText)).toBeInTheDocument();
  });
}); // describe usePredicateProperties
