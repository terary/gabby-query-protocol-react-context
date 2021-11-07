/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */

import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  PredicateFormulaEditorFactory,
  TPredicateSubjectDictionaryJson,
} from "gabby-query-protocol-lib";

import type {
  TPredicatePropertiesJunction,
  TPredicateProperties,
} from "gabby-query-protocol-lib";

// import GQPPredicateEditorContextProvider, { GQPPredicateEditorContext } from "./Provider";
import { PredicateFormulaEditorContext } from "./Provider";
import type { TPredicateFormulaEditorContextType } from "./type";
// import type { TGQPPredicateEditorContextType } from "./type";

// import subjectsDocumentJson from "../../test-resources/test-subject-document.json";
import subjectsDocumentJson from "../../test-data/test-predicate-subject-dictionary.json";

// import subjectsDocumentJson from "../../test-resources/test-subject-document.json";
const predicateIds: { [predicateName: string]: string } = {};
const predicateFormulaEditor = PredicateFormulaEditorFactory.fromEmpty(
  subjectsDocumentJson as TPredicateSubjectDictionaryJson,
  { newRootId: "testTree" }
);
predicateFormulaEditor.predicatesAppend("testTree", {
  subjectId: "firstname",
  operator: "$eq",
  value: "Component Default Tree",
});
predicateIds.child0 = predicateFormulaEditor.predicatesAppend(
  predicateFormulaEditor.rootNodeId,
  {
    subjectId: "firstname",
    operator: "$eq",
    value: "valueOfChild0",
  }
);

predicateIds.child1 = predicateFormulaEditor.predicatesAppend(
  predicateFormulaEditor.rootNodeId,
  {
    subjectId: "firstname",
    operator: "$eq",
    value: "valueOfChild1",
  }
);

interface Props {
  // predicateTree?: PredicateTree;
  children?: JSX.Element;
}

function QueryContainer({ children }: Props) {
  return (
    <PredicateFormulaEditorContext.provider predicateFormulaEditor={predicateFormulaEditor}>
      {children}
    </PredicateFormulaEditorContext.provider>
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

test(".makeEmptyPredicate - creates empty but valid QueryPredicate", () => {
  const MyInjector = () => {
    const { makeEmptyPredicate } = React.useContext(
      PredicateFormulaEditorContext.context
    ) as TPredicateFormulaEditorContextType;

    expect(makeEmptyPredicate()).toStrictEqual({
      operator: "$eq",
      subjectId: "firstname",
      value: "",
    });
    return <span>Some dummy text</span>;
  };

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
});

test(".getPredicateProperties works as expected", () => {
  const MyInjector = () => {
    const { getPredicateById } = React.useContext(
      PredicateFormulaEditorContext.context
    ) as TPredicateFormulaEditorContextType;

    const root = getPredicateById(
      predicateFormulaEditor.rootNodeId
    ) as TPredicatePropertiesJunction;

    const child0 = getPredicateById(predicateIds.child0) as TPredicateProperties;
    const child1 = getPredicateById(predicateIds.child1) as TPredicateProperties;
    return (
      <>
        <span>root: {root.operator}</span>
        <span>child0: {child0.value}</span>
        <span>child1: {child1.value}</span>
      </>
    );
  };

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
  const rootText = screen.getByText("root: $and");
  expect(rootText).toBeInTheDocument();

  const child0Text = screen.getByText("child0: valueOfChild0");
  expect(child0Text).toBeInTheDocument();

  const child1Text = screen.getByText("child1: valueOfChild1");
  expect(child1Text).toBeInTheDocument();
});

test(".getPredicateProperties works as expected (2)", () => {
  const MyInjector = () => {
    const { getPredicateById } = React.useContext(
      PredicateFormulaEditorContext.context
    ) as TPredicateFormulaEditorContextType;

    const root = getPredicateById(
      predicateFormulaEditor.rootNodeId
    ) as TPredicatePropertiesJunction;
    const child0 = getPredicateById(predicateIds.child0) as TPredicateProperties;
    const child1 = getPredicateById(predicateIds.child1) as TPredicateProperties;
    return (
      <>
        <span>root: {root.operator}</span>
        <span>child0: {child0.value}</span>
        <span>child1: {child1.value}</span>
      </>
    );
  };

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
  const rootText = screen.getByText("root: $and");
  expect(rootText).toBeInTheDocument();

  const child0Text = screen.getByText("child0: valueOfChild0");
  expect(child0Text).toBeInTheDocument();

  const child1Text = screen.getByText("child1: valueOfChild1");
  expect(child1Text).toBeInTheDocument();
});

test(".setDisjunction, .setConjunction works as expected", () => {
  const MyInjector = () => {
    const { getPredicateById, setDisjunction, setConjunction } = React.useContext(
      PredicateFormulaEditorContext.context
    ) as TPredicateFormulaEditorContextType;
    const root = getPredicateById(
      predicateFormulaEditor.rootNodeId
    ) as TPredicatePropertiesJunction;
    const handleSetDisjunction = () => {
      setDisjunction(predicateFormulaEditor.rootNodeId);
    };
    const handleSetConjunction = () => {
      setConjunction(predicateFormulaEditor.rootNodeId);
    };
    return (
      <>
        <button type="button" onClick={handleSetDisjunction}>
          set disjunction
        </button>
        <button type="button" onClick={handleSetConjunction}>
          set conjunction
        </button>
        <span>root: {root.operator}</span>
      </>
    );
  };

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
  const disjunctionButton = screen.getByText("set disjunction");
  const conjunctionButton = screen.getByText("set conjunction");

  // preCondition
  expect(screen.queryByText("root: $and")).toBeInTheDocument();
  expect(screen.queryByText("root: $or")).not.toBeInTheDocument();

  // exercise 1
  fireEvent.click(disjunctionButton);
  expect(screen.queryByText("root: $and")).not.toBeInTheDocument();
  expect(screen.queryByText("root: $or")).toBeInTheDocument();

  // exercise 2
  fireEvent.click(conjunctionButton);
  expect(screen.queryByText("root: $and")).toBeInTheDocument();
  expect(screen.queryByText("root: $or")).not.toBeInTheDocument();
});

test(".removePredicate & .getChildrenIds works as expected", () => {
  const MyInjector = () => {
    const { getChildrenIds, removePredicate } = React.useContext(
      PredicateFormulaEditorContext.context
    ) as TPredicateFormulaEditorContextType;
    const childrenIds = getChildrenIds(predicateFormulaEditor.rootNodeId);
    const handleRemovePredicate = () => {
      removePredicate(predicateIds.child0);
    };
    return (
      <>
        <button type="button" onClick={handleRemovePredicate}>
          remove child
        </button>
        <span>children: {JSON.stringify(childrenIds)}</span>
      </>
    );
  };

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
  const removeChildButton = screen.getByText("remove child");

  // preCondition
  expect(
    screen.queryByText('children: ["testTree:0","testTree:1","testTree:2","testTree:3"]')
  ).toBeInTheDocument();

  // exercise
  fireEvent.click(removeChildButton);
  expect(
    screen.queryByText('children: ["testTree:0","testTree:1","testTree:3"]')
  ).toBeInTheDocument();
});

test(".appendPredicate & .updatePredicate works as expected", () => {
  const MyInjector = () => {
    const { appendPredicate, updatePredicate, getChildrenIds, getPredicateById } =
      React.useContext(
        PredicateFormulaEditorContext.context
      ) as TPredicateFormulaEditorContextType;

    const [newPredicateId, setNewPredicateId] = React.useState("");
    const [newPredicate, setNewPredicate] = React.useState({});

    const childrenIds = getChildrenIds(predicateFormulaEditor.rootNodeId);
    const childrenTag = `Children: ${JSON.stringify(childrenIds)}`;
    const handleAppend = () => {
      const predicateToBeAppended: TPredicateProperties = {
        subjectId: "firstname",
        operator: "$eq",
        value: "The New Predicate",
      };
      const newChildId = appendPredicate(
        predicateFormulaEditor.rootNodeId,
        predicateToBeAppended
      );
      setNewPredicateId(newChildId);
      setNewPredicate(predicateToBeAppended);
    };

    const handleUpdate = () => {
      const revisedPredicate = {
        ...newPredicate,
        ...{ operator: "$gt" },
      } as TPredicateProperties;
      updatePredicate(newPredicateId, revisedPredicate);
      setNewPredicate(getPredicateById(newPredicateId) || {});
    };
    return (
      <>
        <button type="button" onClick={handleAppend}>
          Append Predicate
        </button>
        <button type="button" onClick={handleUpdate}>
          Update Predicate
        </button>
        <span>New Child ID: {newPredicateId}</span>
        <span>{childrenTag}</span>
        <span>New Predicate: {JSON.stringify(newPredicate)}</span>
      </>
    );
  };

  render(
    <QueryContainer>
      <MyInjector />
    </QueryContainer>
  );
  const appendButton = screen.getByText("Append Predicate");
  const updateButton = screen.getByText("Update Predicate");

  // preCondition
  expect(screen.queryByText(/New Child ID:/)).toBeInTheDocument();

  const displayTextBefore = screen.queryByText(
    'Children: ["testTree:0","testTree:1","testTree:3"]'
  );
  expect(displayTextBefore).toBeInTheDocument();
  expect(screen.queryByText("New Predicate: {}")).toBeInTheDocument();

  // exercise 1  -- append
  fireEvent.click(appendButton);

  const newChildIdDisplay = screen.queryByText("New Child ID: testTree:4");
  expect(newChildIdDisplay).toBeInTheDocument();

  const displayTextAfter = screen.queryByText(
    'Children: ["testTree:0","testTree:1","testTree:3","testTree:4"]'
  );

  expect(displayTextAfter).toBeInTheDocument();
  expect(
    screen.queryByText(
      'New Predicate: {"subjectId":"firstname","operator":"$eq","value":"The New Predicate"}'
    )
  ).toBeInTheDocument();

  // exercise 2  -- update
  fireEvent.click(updateButton);
  expect(
    screen.queryByText(
      'New Predicate: {"subjectId":"firstname","operator":"$gt","value":"The New Predicate"}'
    )
  ).toBeInTheDocument();
});
