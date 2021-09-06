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

describe("useProjection", () => {
  test("Should return a projection instance", () => {
    const MyInjector = () => {
      const projection = useProjectionSubjects();
      const k = Object.keys(projection);
      expect(typeof projection).toBe("object");
      expect(typeof projection.addProjectionItem).toBe("function");
      expect(typeof projection.projectionList).toBe("function");
      expect(typeof projection.removeProjectionItem).toBe("function");
      expect(typeof projection).toBe("object");
      expect(projection.projectableSubjects.constructor.name).toBe(
        "ProjectableSubjectDictionary"
      );
      expect(Object.keys(projection).length).toBe(4);

      return <span>dummy text to make sense of this world</span>;
    };

    render(
      <QueryContainer>
        <MyInjector />
      </QueryContainer>
    );
  });
}); // describe("useProjection"

describe("useProjectionSubject", () => {
  test("Should return a projection instance", () => {
    const MyInjector = () => {
      const subject = useProjectionSubjectProperties("key0");
      expect(typeof subject).toBe("object");
      expect(typeof subject.projectedSubject).toBe("object");
      expect(typeof subject.updateProjectionSubject).toBe("function");
      expect(Object.keys(subject).length).toBe(2);

      React.useEffect(() => {
        const expectedFunctionCall = () => {
          subject.updateProjectionSubject({});
        };
        expect(expectedFunctionCall).not.toThrow();
      }, []);
      return <span>dummy text to make sense of this world</span>;
    };

    render(
      <QueryContainer>
        <MyInjector />
      </QueryContainer>
    );
  });
}); // describe("useProjection"
