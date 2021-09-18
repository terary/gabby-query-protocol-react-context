// cspell:ignore Componentized

import React from "react";
import "./App.css";

import { DemoPredicateFormulaInitialized } from  "./dev-example/PredicateFormula"
import {DemoProjectionInitialized} from './dev-example/Projection'

function App() {
  return (
    <div className="App">
      <DemoPredicateFormulaInitialized />
      <hr />
      <DemoProjectionInitialized />
    </div>
  );
}

export default App;
