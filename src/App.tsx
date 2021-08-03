// cspell:ignore Componentized

import React from "react";
import "./App.css";

import QueryEditorComponentized from  "./dev-example/Componentized/QueryEditorComponentized"

// import { DebugPredicateEditorHost } from "./dev-expample/PredicateEditor/DebugPredicateEditorHost";
// import { PredicateEditor } from "./dev-expample/PredicateEditor/PredicateEditor";

function App() {
  return (
    <div className="App">
      {/* <PredicateEditor /> */}
      {/* <DebugPredicateEditorHost /> */}
      <hr />
      <QueryEditorComponentized />
    </div>
  );
}

export default App;
