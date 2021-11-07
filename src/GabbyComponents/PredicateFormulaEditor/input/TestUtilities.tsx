import {
  PredicateFormulaEditorFactory,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
  TValidatorResponse,
} from "gabby-query-protocol-lib";

// import GQPPredicateEditorContextProvider from "../../../../GabbyQueryProtocol/contexts/GQPPredicateFormula/context";
import GQPPredicateEditorContextProvider from "../../../GabbyQueryProtocol/PredicateFormula/context";
// import GQPPredicateEditorContextProvider from "../../GabbyQueryProtocol/contexts/GQPPredicateFormula/context";
import { GABBY_EXAMPLE_JSON_BLUE_SKIES } from "../../../GabbyQueryProtocol";
import * as predefinedOperatorLabels from "../../../GabbyQueryProtocol/external-resources/operator-labels";
import { ReactElement, ReactNode } from "react";
// import { InputMux } from "../../GabbyComponents/components/PredicateFormulaEditor/InputMux";
// import * as predefinedOperatorLabels from "../gabby/external-resources/operator-labels";
const fakeValidator = (
  ////
  predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
): TValidatorResponse => {
  return { hasError: false, errorMessages: [] };
};

const subjectDictionaryJson =
  GABBY_EXAMPLE_JSON_BLUE_SKIES.LIB.predicateSubjectsDictionaryJson;
const predicateFormula = GABBY_EXAMPLE_JSON_BLUE_SKIES.LIB.predicateTreeJson;
const predicateFormulaEditor = PredicateFormulaEditorFactory.fromJson({
  subjectDictionaryJson,
  predicateTreeJson: predicateFormula,
});

const predicate: TPredicateProperties = {
  operator: "$eq",
  value: "Awesome",
  subjectId: "firstName",
};

export const withGabbyPredicateFormulaContext = ({ children }: { children: JSX.Element }) => {
  return GQPPredicateEditorContextProvider({
    children,
    predicateFormulaEditor: predicateFormulaEditor,
    operatorLabels: predefinedOperatorLabels.AR,
  });
};
// export const GabbyPowered = () => {
//   return (
//     <GQPPredicateEditorContextProvider
//       predicateFormulaEditor={predicateFormulaEditor}
//       operatorLabels={predefinedOperatorLabels.AR}
//     >
//       <InputMux predicate={predicate} onChange={() => {}} />
//       {/* <PredicateEditor
//         initialPredicate={predicateFormulaEditor.subjectDictionary.makeEmptyPredicate()}
//         onFinish={(p: any) => {}}
//         onCancel={() => {}}
//         validator={fakeValidator}
//       /> */}
//     </GQPPredicateEditorContextProvider>
//   );
// };
