/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BooleanInput } from "./BooleanInput";

interface IProps {
  id?: string;
  label?: string;
  name?: string;
  onChange?: (value: boolean) => void; // we'll allow empty strings
  value?: boolean;
}
const defaultProps = {
  id: "the-id",
  label: "the label",
  name: "the-name",
  onChange: (inputValue: boolean) => {},
  value: false,
};

const BuildStatefulInput = (props: IProps) => {
  const effectiveProps = { ...defaultProps, ...props };

  const [val, setVal] = useState<boolean>(effectiveProps.value);
  const defaultHandleOnChange = (inputValue: boolean): void => {
    setVal(inputValue);
  };
  const onChange = props.onChange || defaultHandleOnChange;

  if (effectiveProps.onChange === undefined) {
    effectiveProps.onChange = onChange;
  }

  return <BooleanInput {...effectiveProps} value={val} />;
};

describe("Boolean", () => {
  describe("Initial presentation", () => {
    it("Should display 'checked'", () => {
      act(() => {
        render(<BuildStatefulInput value />);
      });
      expect(screen.getByRole("checkbox")).toBeChecked();
    });
    it("Should display 'unchecked'", () => {
      act(() => {
        render(<BuildStatefulInput value={null as unknown as boolean} />);
      });
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });
    it("Should set name/id", () => {
      act(() => {
        const result = render(
          <BuildStatefulInput id="my-id" name="the-name" label="the-label" />
        );

        // const result = render(<BuildInput />);
        const inputs = result.container.querySelectorAll("#my-id");
        expect(inputs.length).toBe(1);
        expect(inputs[0].getAttribute("type")).toBe("checkbox");
        expect(inputs[0].getAttribute("name")).toBe("the-name");
      });
    });
  }); //  describe('Initial presentation'
  describe("User interaction", () => {
    it("Should call onChange with true, going from unchecked to checked", () => {
      act(() => {
        const mockOnChange = jest.fn();
        const result = render(
          <BuildStatefulInput
            id="my-id"
            onChange={mockOnChange}
            name="the-name"
            label="the-label"
          />
        );

        const checkbox = result.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(mockOnChange).toHaveBeenCalledWith(true);
      });
    });
    it("Should call onChange with false, going from checked to unchecked", () => {
      act(() => {
        const mockOnChange = jest.fn();
        const result = render(
          <BuildStatefulInput
            id="my-id"
            onChange={mockOnChange}
            name="the-name"
            label="the-label"
            value
          />
        );

        const checkbox = result.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(mockOnChange).toHaveBeenCalledWith(false);
      });
    });
    it.skip("Should check user interactions", () => {
      // does nothing.
    });
  });
});
