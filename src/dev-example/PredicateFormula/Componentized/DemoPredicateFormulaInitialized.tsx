/* eslint-disable import/prefer-default-export */
import { EXAMPLE_JSON_BLUE_SKIES, PredicateFormulaEditor } from "../../import-from-lib";
import QueryEditorComponent from "./QueryEditorComponent";
import * as opLabels from "../../external-resources/operator-labels";

const LIB_EXAMPLE_JSON = EXAMPLE_JSON_BLUE_SKIES.LIB;

const predicateFormulaEditor = PredicateFormulaEditor.fromJson({
  subjectDictionaryJson: LIB_EXAMPLE_JSON.predicateSubjectsDictionaryJson,

  // This is optional.  Edit existing tree or leave undefined to create new tree
  predicateTreeJson: LIB_EXAMPLE_JSON.predicateTreeJson,
});

export const DemoPredicateFormulaInitialized = (): JSX.Element => {
  return (
    <QueryEditorComponent
      predicateFormulaEditor={predicateFormulaEditor}
      operatorLabels={opLabels.AR}
    />
  );
};
