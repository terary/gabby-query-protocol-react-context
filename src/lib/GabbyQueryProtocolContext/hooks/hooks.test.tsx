/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
import * as React from "react";
import { render } from "@testing-library/react";
import {
  ProjectionManager,
  ProjectableSubjects,
  PredicateSubjectDictionary,
  PredicateTree,
} from "gabby-query-protocol-lib";

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

const subjectDictionary = PredicateSubjectDictionary.fromJson(subjectsDocumentJson);
const projectableSubjects = ProjectableSubjects.fromJson(
  projectableSubjectsJson.projectableSubjects
);

const contextProjection = ProjectionManager.fromFlatFile(
  blueSky.projection,
  projectableSubjects
);

const pTree = new PredicateTree("testTree", {
  subjectId: "someSubjectId",
  operator: "$eq",
  value: "Component Default Tree",
});

interface Props {
  predicateTree?: PredicateTree;
  children?: JSX.Element;
}

function QueryContainer({ predicateTree = pTree, children }: Props) {
  return (
    <PredicateTreeProvider
      subjectDictionary={subjectDictionary}
      predicateTree={predicateTree}
      projection={contextProjection}
    >
      {children}
    </PredicateTreeProvider>
  );
}

describe("useJunctionNodeProperties", () => {
  it("Should return only necessary properties and nothing more", () => {
    const MyInjector = () => {
      // here to satisfy coverage.  These function are tested elsewhere.
      // useJunctionNodeProperties are wrappers for underlying functions
      const junctionMethods = useJunctionProperties("nodeId");
      expect(typeof junctionMethods.appendPredicate).toBe("function");
      expect(typeof junctionMethods.getChildrenIds).toBe("function");
      expect(typeof junctionMethods.geTPredicateProperties).toBe("function");
      expect(typeof junctionMethods.makeEmptyPredicate).toBe("function");
      expect(typeof junctionMethods.queryPredicate).toBe("object");
      expect(typeof junctionMethods.removeMe).toBe("function");
      expect(typeof junctionMethods.setConjunction).toBe("function");
      expect(typeof junctionMethods.setDisjunction).toBe("function");
      expect(Object.keys(junctionMethods).length).toBe(8);

      expect(junctionMethods.appendPredicate).toThrow(
        "Could not find parentId: 'nodeId'"
      );
      expect(junctionMethods.geTPredicateProperties).not.toThrow();
      expect(junctionMethods.getChildrenIds).toThrow(/could not find parent/i);
      expect(junctionMethods.removeMe).toThrow(/does not exist/);
      expect(junctionMethods.setConjunction).toThrow(
        'setPayload: node not found "nodeId"'
      );
      expect(junctionMethods.setDisjunction).toThrow(
        'setPayload: node not found "nodeId"'
      );

      return <span>dummy text to make sense of this world</span>;
    };

    render(
      <QueryContainer>
        <MyInjector />
      </QueryContainer>
    );
  });
}); // describe useJunctionNodeProperties

// --------------------------
describe("usePredicateNodeProperties", () => {
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
      expect(Object.keys(predicateMethods).length).toBe(6);

      expect(predicateMethods.queryPredicate).toBeNull();
      expect(predicateMethods.appendPredicate).toThrow(/could not find parent/i);
      expect(predicateMethods.removeMe).toThrow(/does not exist/);
      expect(predicateMethods.updateMe).toThrow('setPayload: node not found "nodeId"');
      return <span>dummy text to make sense of this world</span>;
    };

    render(
      <QueryContainer>
        <MyInjector />
      </QueryContainer>
    );
  });
}); // describe usePredicateNodeProperties

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
      expect(projection.projectableSubjects.constructor.name).toBe("ProjectableSubjects");
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
