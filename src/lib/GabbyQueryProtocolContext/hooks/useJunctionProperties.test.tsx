/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */

import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  PredicateFormulaEditor,
  PredicateFormulaEditorFactory,
  TPredicateSubjectDictionaryJson,
} from "gabby-query-protocol-lib";
import {
  Projection,
  ProjectableDictionaryFactory,
} from "gabby-query-protocol-projection";
import type { TProjectableSubjectsDictionaryJson } from "gabby-query-protocol-projection";

import {
  useJunctionProperties,
  usePredicateProperties,
  useProjectionSubjects,
  useProjectionSubjectProperties,
} from ".";

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
      projectionEditor={contextProjection}
    >
      {children}
    </PredicateTreeProvider>
  );
}

describe("useJunctionNodeProperties", () => {
  it("Should return only necessary properties and nothing more", () => {
    const MyInjector = () => {
      const junctionMethods = useJunctionProperties(formulaEditor.rootNodeId);
      expect(typeof junctionMethods.appendPredicate).toBe("function");
      expect(typeof junctionMethods.getChildrenIds).toBe("function");
      expect(typeof junctionMethods.getPredicateProperties).toBe("function");
      expect(typeof junctionMethods.makeEmptyPredicate).toBe("function");
      expect(typeof junctionMethods.queryPredicate).toBe("object");
      expect(typeof junctionMethods.removeMe).toBe("function");
      expect(typeof junctionMethods.setConjunction).toBe("function");
      expect(typeof junctionMethods.setDisjunction).toBe("function");
      expect(Object.keys(junctionMethods).length).toBe(8);

      expect(junctionMethods.appendPredicate).toThrow(
        "appendPredicate, predicate failed validation"
      );
      expect(junctionMethods.getPredicateProperties).not.toThrow();
      // expect(junctionMethods.getChildrenIds).toThrow(/could not find parent/i);
      expect(junctionMethods.removeMe).toThrow(/Can not remove Root node/);
      expect(junctionMethods.getChildrenIds).not.toThrow();

      return <span>dummy text to make sense of this world</span>;
    };

    render(
      <QueryContainer>
        <MyInjector />
      </QueryContainer>
    );
  });
  it("Should update junction operator", () => {
    const MyInjector = () => {
      const junctionMethods = useJunctionProperties(formulaEditor.rootNodeId);
      const currentJunction = junctionMethods.getPredicateProperties();

      const handleSetConjunction = () => {
        junctionMethods.setConjunction();
      };
      const handleSetDisjunction = () => {
        junctionMethods.setDisjunction();
      };
      return (
        <div>
          <p>
            <button type="button" onClick={handleSetConjunction}>
              Set Conjunction
            </button>
            <button type="button" onClick={handleSetDisjunction}>
              Set Disjunction
            </button>
            junction operator: {currentJunction.operator}
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
    const preconditionText = "junction operator: $and";
    expect(screen.queryByText(preconditionText)).toBeInTheDocument();

    // exercise 1 - set disjunction
    const disjunctionButton = screen.getByText("Set Disjunction");
    fireEvent.click(disjunctionButton);
    const disjunctionText = "junction operator: $or";
    expect(screen.queryByText(disjunctionText)).toBeInTheDocument();

    // exercise 2 - set conjustion
    const conjunctionButton = screen.getByText("Set Conjunction");
    fireEvent.click(conjunctionButton);
    const conjunctionText = "junction operator: $and";
    expect(screen.queryByText(conjunctionText)).toBeInTheDocument();
  });
}); // describe useJunctionNodeProperties
