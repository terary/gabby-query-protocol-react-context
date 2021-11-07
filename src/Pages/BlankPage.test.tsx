import React from "react";
import renderer from "react-test-renderer";
import { BlankPage } from "./BlankPage";
import { BrowserRouter } from "react-router-dom";
import { AppContextProviders } from "../Application/AppContextProviders";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <AppContextProviders>
        <BrowserRouter>
          <BlankPage />
        </BrowserRouter>
      </AppContextProviders>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
