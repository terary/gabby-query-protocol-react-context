import React from "react";
import renderer from "react-test-renderer";
import { ApplicationFeaturesPage } from "./ApplicationFeatures";
import { BrowserRouter } from "react-router-dom";
import { AppContextProviders } from "../Application/AppContextProviders";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <AppContextProviders>
        <BrowserRouter>
          <ApplicationFeaturesPage />
        </BrowserRouter>
      </AppContextProviders>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
