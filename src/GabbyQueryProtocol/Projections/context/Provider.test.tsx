/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */

import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  Projection,
  ProjectableDictionaryFactory,
  TProjectableSubjectsDictionaryJson,
} from "gabby-query-protocol-projection";

import GQPProjectionContextProvider, { GQPProjectionContext } from ".";
import type { TGQProjectionContextType } from "./type";

// import * as projectableSubjectsJson from "../../test-resources/test-projectable-fields.json";
// import * as blueSky from "../../test-resources/test-projection-flat-file.json";
import * as projectableSubjectsJson from "../../test-data/test-projectable-fields.json";
import * as blueSky from "../../test-data/test-projection-flat-file.json";

const projectableSubjects = ProjectableDictionaryFactory.fromJson(
  projectableSubjectsJson.projectableSubjects as TProjectableSubjectsDictionaryJson
);

const contextProjection = Projection.fromFlatFile(blueSky.projection, projectableSubjects);

interface Props {
  // predicateTree?: PredicateTree;
  children?: JSX.Element;
}
function QueryContainer({ children }: Props) {
  return (
    <GQPProjectionContextProvider
      // predicateFormulaEditor={predicateFormulaEditor}
      projectionEditor={contextProjection}
    >
      {children}
    </GQPProjectionContextProvider>
  );
}
test("GabbyQueryProtocolContext - blue sky", () => {
  const MyInjector = () => <span>The Injector</span>;

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
  const resultText = "The Injector";
  const toggleButton = screen.getByText(resultText);
  expect(toggleButton).toBeInTheDocument();
});

test(".addProjectionItem - creates empty but valid QueryPredicate", () => {
  const MyInjector = () => {
    const { addProjectionItem, getProjectionItem } = React.useContext(
      GQPProjectionContext
    ) as TGQProjectionContextType;
    const newProjectionItem = {
      subjectId: "firstname",
      columnOrder: 1,
      sortOrder: 1,
      label: "Test Label",
    };
    React.useEffect(() => {
      const newProjectionSubjectId = addProjectionItem(newProjectionItem);
      const savedProjectionItem = getProjectionItem(newProjectionSubjectId);
      expect(newProjectionItem).toStrictEqual(savedProjectionItem);
    }, []);

    return <span>Some dummy text</span>;
  };

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
});

test(".getOrderedProjectionList should return list of projectableSubject order by columnOrder", () => {
  const MyInjector = () => {
    const { getOrderedProjectionList } = React.useContext(
      GQPProjectionContext
    ) as TGQProjectionContextType;
    const projectionList = getOrderedProjectionList();
    const disOrderedKeys = Object.keys(projectionList);
    let previousColumnOrder = -100000;
    for (let i = 0; i < disOrderedKeys.length; i++) {
      const thisProjectionItem = projectionList[disOrderedKeys[i]];
      expect(thisProjectionItem.columnOrder).toBeGreaterThanOrEqual(previousColumnOrder);
      previousColumnOrder = thisProjectionItem.columnOrder;
    }
    return <span>Some Dummy Text</span>;
  };

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
});

test(".getOrderedProjectionList should return list of projectableSubject order by columnOrder(2)", () => {
  const MyInjector = () => {
    // set-up
    const { addProjectionItem, getProjectionItem, removeProjectionItem } = React.useContext(
      GQPProjectionContext
    ) as TGQProjectionContextType;
    const toBeRemovedSubject = {
      subjectId: "firstname",
      label: "to-be-removed",
      columnOrder: 3,
      sortOrder: 0,
    };

    React.useEffect(() => {
      const removeId = addProjectionItem(toBeRemovedSubject);
      // preCondition
      expect(getProjectionItem(removeId)).toStrictEqual(toBeRemovedSubject);

      // exercise
      removeProjectionItem(removeId);

      // post condition
      expect(getProjectionItem(removeId)).toBeUndefined();
    }, []);

    return <span>Some Dummy Text</span>;
  };

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
});
