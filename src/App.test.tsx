import React from "react";
import renderer, { act } from "react-test-renderer";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { toMatchDiffSnapshot } from "snapshot-diff";
expect.extend({ toMatchDiffSnapshot });

describe("AppSideDrawer", () => {
  describe("Snapshots open/close", () => {
    it("Should render left horizontal menu, opened", () => {
      const tree = renderer.create(<App />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  }); // describe("Snapshots open/close"
});
