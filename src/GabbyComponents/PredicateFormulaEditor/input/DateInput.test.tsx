import React from "react";
import renderer from "react-test-renderer";
import { DateInput } from "./DateInput";
import { BrowserRouter } from "react-router-dom";
import { AppContextProviders } from "../../../Application/AppContextProviders";

const props = {
  formatMask: "__/__/____",
  id: "dateInput-id",
  isValid: (value: unknown) => true,
  label: "dateInput-label",
  name: "dateInput-name",
  onChange: (value: string) => {}, // we'll allow empty strings
  value: "1969-07-20",
};

it("renders correctly", () => {
  const tree = renderer
    .create(
      <AppContextProviders>
        <BrowserRouter>
          <DateInput {...props} />
        </BrowserRouter>
      </AppContextProviders>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
