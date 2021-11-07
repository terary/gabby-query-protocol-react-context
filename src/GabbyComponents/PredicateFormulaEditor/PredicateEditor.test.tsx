import React from "react";
import renderer from "react-test-renderer";
import {
  render,
  screen,
  act,
  fireEvent,
  cleanup,
  within,
  getByTestId,
  getByLabelText,
  findByDisplayValue,
  getByText,
  findByText,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";

import {
  PredicateFormulaEditorFactory,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
  TValidatorResponse,
} from "gabby-query-protocol-lib";

//import { AppContextProviders } from "../Application/AppContextProviders";
import GQPPredicateEditorContextProvider from "../../GabbyQueryProtocol/PredicateFormula/context";
//import GQPPredicateEditorContextProvider from "../../GabbyQueryProtocol/contexts/GQPPredicateFormula/context";
import { GABBY_EXAMPLE_JSON_BLUE_SKIES } from "../../GabbyQueryProtocol";
import * as predefinedOperatorLabels from "../../GabbyQueryProtocol/external-resources/operator-labels";

import { PredicateEditor } from "./PredicateEditor";
import { executionAsyncResource } from "async_hooks";

const subjectDictionaryJson =
  GABBY_EXAMPLE_JSON_BLUE_SKIES.LIB.predicateSubjectsDictionaryJson;
const predicateFormula = GABBY_EXAMPLE_JSON_BLUE_SKIES.LIB.predicateTreeJson;

const predicateFormulaEditor = PredicateFormulaEditorFactory.fromJson({
  subjectDictionaryJson,
  predicateTreeJson: predicateFormula,
});

type PredicateTypes = TPredicateProperties | TPredicatePropertiesArrayValue;

const validator = (predicateProperties: PredicateTypes) => {
  return { hasError: false, errorMessages: [] };
};

const noopFinish = (predicate: PredicateTypes) => {};
const noopCancel = () => {};
type Props = {
  onFinish?: (predicate: PredicateTypes) => void;
  onCancel?: () => void;
  testSpyPredicateOnChange?: (
    predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
  ) => void;
};

const PredicateEditorWithApplicationContext = ({
  onFinish = noopFinish,
  onCancel = noopCancel,
  testSpyPredicateOnChange,
}: Props) => {
  return (
    <GQPPredicateEditorContextProvider
      predicateFormulaEditor={predicateFormulaEditor}
      operatorLabels={predefinedOperatorLabels.EN}
    >
      <PredicateEditor
        initialPredicate={predicateFormulaEditor.subjectDictionary.makeEmptyPredicate()}
        onFinish={(p: any) => {}}
        onCancel={() => {}}
        testSpyPredicateOnChange={testSpyPredicateOnChange}
        validator={validator}
      />{" "}
    </GQPPredicateEditorContextProvider>
  );
};
describe("PredicateEditor", () => {
  afterEach(cleanup);
  it("Should be awesome", () => {
    expect("Awesome").toBe("Awesome");
  });
  describe("SubjectChange", () => {
    it.only("Should change subject, reset operator and empty value", async () => {
      const changeObserver = jest.fn((p: any) => {
        console.log(p);
        renderer;
      });

      const mockFinish = jest.fn();

      const result = render(
        <PredicateEditorWithApplicationContext
          testSpyPredicateOnChange={changeObserver}
          onFinish={mockFinish}
        />
      );
    });
  });
  describe("Snapshots", () => {
    it.skip("renders correctly", () => {
      const tree = renderer.create(<PredicateEditorWithApplicationContext />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
