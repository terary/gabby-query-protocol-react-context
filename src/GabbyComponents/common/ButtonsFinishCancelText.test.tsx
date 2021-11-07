import React from "react";
import renderer from "react-test-renderer";
import { ButtonsFinishCancelText } from "./ButtonsFinishCancelText";
import { AppContextProviders } from "../../Application/AppContextProviders";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <AppContextProviders>
        <ButtonsFinishCancelText onCancel={() => {}} onFinish={() => {}} />
      </AppContextProviders>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
