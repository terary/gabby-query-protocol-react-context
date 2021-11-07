import React from "react";
import renderer from "react-test-renderer";
import { AlertContainer } from "./AlertContainer";
import { BrowserRouter } from "react-router-dom";

describe("AlertContainer (internal use only)", () => {
  it("Should render error", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <AlertContainer
            message="Alert Container Message"
            title="The Title"
            severity="error"
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Should render info", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <AlertContainer
            message="Alert Container Message"
            title="The Title"
            severity="info"
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Should render success", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <AlertContainer
            message="Alert Container Message"
            title="The Title"
            severity="success"
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Should render warning", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <AlertContainer
            message="Alert Container Message"
            title="The Title"
            severity="warning"
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Title should be optional", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <AlertContainer message="Alert Container Message" severity="warning" />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
