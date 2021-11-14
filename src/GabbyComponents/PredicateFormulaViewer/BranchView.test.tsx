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
import { AppContextProviders } from "../../Application/AppContextProviders";

import {
  PredicateFormulaEditorFactory,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
  TValidatorResponse,
} from "gabby-query-protocol-lib";

//import { AppContextProviders } from "../Application/AppContextProviders";
// import GQPPredicateEditorContextProvider from "../../GabbyQueryProtocol/PredicateFormula/context";
import { PredicateFormulaEditorContext } from "../../GabbyQueryProtocol";
//import GQPPredicateEditorContextProvider from "../../GabbyQueryProtocol/contexts/GQPPredicateFormula/context";
import { GABBY_EXAMPLE_JSON_BLUE_SKIES } from "../../GabbyQueryProtocol";
import * as predefinedOperatorLabels from "../../GabbyQueryProtocol/external-resources/operator-labels";

import { BranchView } from "./BranchView";

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
  predicateId: string;
  children?: React.ReactNode;
};

const PredicateEditorWithApplicationContext = ({ predicateId, children }: Props) => {
  return (
    <AppContextProviders>
      <PredicateFormulaEditorContext.Provider
        predicateFormulaEditor={predicateFormulaEditor}
        operatorLabels={predefinedOperatorLabels.EN}
      >
        <BranchView predicateId={predicateId} />
        {/* <PredicateEditor
        initialPredicate={predicateFormulaEditor.subjectDictionary.makeEmptyPredicate()}
        onFinish={(p: any) => {}}
        onCancel={() => {}}
        testSpyPredicateOnChange={testSpyPredicateOnChange}
        validator={validator}
      />{" "} */}
      </PredicateFormulaEditorContext.Provider>
    </AppContextProviders>
  );
};
describe("BranchView - default snapshot", () => {
  afterEach(cleanup);
  // describe("SubjectChange", () => {
  //   it.only("Should change subject, reset operator and empty value", async () => {
  //     const changeObserver = jest.fn((p: any) => {
  //       console.log(p);
  //       renderer;
  //     });

  //     const mockFinish = jest.fn();

  //     const result = render(
  //       <PredicateEditorWithApplicationContext
  //         testSpyPredicateOnChange={changeObserver}
  //         onFinish={mockFinish}
  //       />
  //     );
  //   });
  // });
  describe("Snapshots", () => {
    it("renders correctly", () => {
      const tree = renderer
        .create(
          <PredicateEditorWithApplicationContext
            predicateId={predicateFormulaEditor.rootNodeId}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
