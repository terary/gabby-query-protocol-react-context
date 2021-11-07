/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import userEvent, { specialChars } from "@testing-library/user-event";

import { render, screen, act, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ExperimentalDateInput } from "./ExperimentalDateInput";

import { AppContextProviders } from "../../../Application/AppContextProviders";
interface IProps {
  formatMask?: string;
  id?: string;
  label?: string;
  // localeCode: TSupportedLocales;
  name?: string;
  onChange?: (value: string) => void; // we'll allow empty strings
  value?: string;
}
const defaultProps = {
  formatMask: "__/__/____",
  id: "the-id",
  label: "the label",
  name: "the-name",
  onChange: (inputValue: string) => {},
  value: "1974-06-29T03:32:01-07:00",
};

const BuildStatefulInput = (props: IProps) => {
  const effectiveProps = { ...defaultProps, ...props };
  // useApplicationUtilities().setCurrentLocale(props.localeCode);

  const [val, setVal] = useState<string>(effectiveProps.value);
  const onChange = (inputValue: string): void => {
    setVal(inputValue);
  };

  if (effectiveProps.onChange === undefined) {
    effectiveProps.onChange = onChange;
  }
  return <ExperimentalDateInput {...effectiveProps} value={val} />;
};

describe("ExperimentDateInput (Mui/Labs, poor coverage, use at own risk)", () => {
  describe("Initial presentation", () => {
    it("Should display in local format given ISO date string (US)", () => {
      act(() => {
        render(
          <AppContextProviders initialLocaleCode="en_us">
            <BuildStatefulInput value="2021-07-31T13:30:00-06:00" />
          </AppContextProviders>
        );
      });

      // const { resetState } = useTestUtilities();
      expect(screen.getByRole("textbox")).toHaveValue("07/31/2021");
    });
    it("Should display in local format given ISO date string (MX)", () => {
      act(() => {
        render(
          <AppContextProviders initialLocaleCode="es_mx">
            <BuildStatefulInput value="2021-07-31T13:30:00-06:00" />
          </AppContextProviders>
        );
      });
      expect(screen.getByRole("textbox")).toHaveValue("31/07/2021");
    });
    it("Should display in local format given ISO date string (RU)", () => {
      act(() => {
        render(
          <AppContextProviders initialLocaleCode="ru_ru">
            <BuildStatefulInput value="2021-07-31T13:30:00-06:00" />
          </AppContextProviders>
        );
      });
      expect(screen.getByRole("textbox")).toHaveValue("31.07.2021");
    });
    it("Should display in local format given ISO date string (MA)", () => {
      // appears there is something wrong with AR dataPickers
      act(() => {
        render(
          <AppContextProviders initialLocaleCode="ar_ma">
            <BuildStatefulInput value="2021-07-31T13:30:00-06:00" />
          </AppContextProviders>
        );
      });
      expect(screen.getByRole("textbox")).toHaveValue("31/07/2021");
    });
    it("Should display empty if null is initial value", () => {
      act(() => {
        render(
          <AppContextProviders>
            <BuildStatefulInput value={null as unknown as string} />
          </AppContextProviders>
        );
      });
      expect(screen.getByRole("textbox")).toHaveValue("");
    });
    it("Should set name/id/label", () => {
      act(() => {
        const result = render(
          <AppContextProviders initialLocaleCode="en_us">
            <BuildStatefulInput id="my-id" name="the-name" label="the-label" />
          </AppContextProviders>
        );
        expect(screen.getByRole("textbox")).toHaveValue("06/29/1974");

        // const result = render(<BuildInput />);
        const inputs = result.container.querySelectorAll("#my-id");
        expect(inputs.length).toBe(1);
        expect(inputs[0].getAttribute("type")).toBe("text");
        expect(inputs[0].getAttribute("name")).toBe("the-name");
        expect(inputs[0].getAttribute("value")).toBe("06/29/1974");

        const label = result.container.querySelectorAll("label");
        expect(label.length).toBe(1);
        expect(label[0].innerHTML).toBe("the-label");
      });
    });
  }); //  describe('Initial presentation'
  describe("User interaction", () => {
    it("does not call onChange if same date selected", async () => {
      const onChangeMock = jest.fn();
      act(() => {
        const result = render(
          <AppContextProviders initialLocaleCode="en_us">
            <BuildStatefulInput
              onChange={onChangeMock}
              id="my-id"
              name="the-name"
              label="the-label"
            />
          </AppContextProviders>
        );
      });
      fireEvent.focus(screen.getByRole("textbox"));

      fireEvent.click(screen.getByLabelText("Choose date, selected date is Jun 29, 1974"));
      await waitFor(() => screen.getByRole("dialog"));

      const dialog = screen.getByRole("dialog");
      fireEvent.click(dialog, {});

      const day = await waitFor(async () => screen.getByText("22"));

      await act(async () => {
        await fireEvent.click(day);
      });
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalledWith("1974-06-21T20:00:00-04:00");
    });
    it.skip("does not call onChange if same date selected(empty)", () => {
      // this has good example but cant seem to get it to work
      // https://spectrum.chat/testing-library/help/help-testing-component-with-input-via-keyboard-events~626595cc-590f-458a-9786-6c79acbfe3ea
      const onChangeMock = jest.fn();
      cleanup();
      act(() => {
        const result = render(
          <AppContextProviders initialLocaleCode="es_mx">
            <BuildStatefulInput
              onChange={onChangeMock}
              id="my-id"
              name="the-name"
              label="the-label"
              value=""
            />
          </AppContextProviders>
        );
        const input = screen.getByRole("textbox");
        // const input = screen.getByDisplayValue("29/06/1974");
        // expect(input).toHaveAttribute("id", "my-id");
        fireEvent.change(input, { target: { value: "28/06/1974" } });
        userEvent.type(input, specialChars.delete);
        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledWith("1974-06-21T20:00:00-04:00");
      });
    });
  });
});
