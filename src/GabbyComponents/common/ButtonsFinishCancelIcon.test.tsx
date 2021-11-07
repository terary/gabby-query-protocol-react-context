import React from "react";
import renderer from "react-test-renderer";
import { ButtonsFinishCancelIcon } from "./ButtonsFinishCancelIcon";
import { BrowserRouter } from "react-router-dom";
// import { AppContextProviders } from "../../Application/AppContextProviders";
import { AppContextProviders } from "../../Application/AppContextProviders";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <AppContextProviders>
        {/* <BrowserRouter> */}
        <ButtonsFinishCancelIcon onCancel={() => {}} onFinish={() => {}} />
        {/* </BrowserRouter> */}
      </AppContextProviders>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
