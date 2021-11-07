/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "./NumberInput";

interface IProps {
  datatype?: "integer" | "decimal";
  id?: string;
  label?: string;
  name?: string;
  onChange?: (value: number | string) => void; // we'll allow empty strings
  value?: number | string;
}
const defaultProps = {
  datatype: "decimal" as "decimal" | "integer",
  id: "the-id",
  label: "the label",
  name: "the-name",
  // onChange: () => {},
  value: 0,
};

const BuildInput = (props: IProps) => {
  const effectiveProps = { ...defaultProps, ...props };
  const [val, setVal] = useState(effectiveProps.value);
  const onChange = (inputValue: number | string) => {
    setVal(inputValue);
  };

  if (effectiveProps.onChange === undefined) {
    effectiveProps.onChange = onChange;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  // @ts-ignore
  return <NumberInput {...effectiveProps} value={val} />;
};

describe("NumberInput", () => {
  describe("Smoke test", () => {
    it("Should render", () => {
      const result = render(<BuildInput />);
      const inputs = result.container.querySelectorAll("#the-id");
      expect(inputs.length).toBe(1);
      expect(inputs[0].getAttribute("type")).toBe("text");
      expect(inputs[0].getAttribute("name")).toBe("the-name");
      expect(inputs[0].getAttribute("value")).toBe("0");

      const label = result.container.querySelectorAll("label");
      expect(label.length).toBe(1);
      expect(label[0].innerHTML).toBe("the label");
    });
  });
  describe("onChange", () => {
    it("State managed by parent", () => {
      const handleCallbackMock = jest.fn();

      act(() => {
        render(<BuildInput onChange={handleCallbackMock} />);
      });
      const inputBox = screen.getByRole("textbox");
      userEvent.type(inputBox, "123");
      // because parent manages state, and this test doesn't change value
      // each keystroke is sent, instead of the accumulation of keystrokes
      expect(handleCallbackMock).toHaveBeenCalledWith(1);
      expect(handleCallbackMock).toHaveBeenCalledWith(2);
      expect(handleCallbackMock).toHaveBeenCalledWith(3);
      expect(screen.getByRole("textbox")).toHaveValue("0"); // original value
    });
    it("Should be called for valid integer", () => {
      act(() => {
        render(<BuildInput value="" datatype="integer" />);
      });
      const inputBox = screen.getByRole("textbox");

      userEvent.type(inputBox, "123");
      expect(inputBox).toHaveValue("123");
    });
    it("Should only be called if valid decimal", () => {
      const handleCallbackMock = jest.fn();

      act(() => {
        render(<BuildInput onChange={handleCallbackMock} datatype="decimal" />);
      });
      const inputBox = screen.getByRole("textbox");
      userEvent.type(inputBox, "abc");
      expect(handleCallbackMock).not.toHaveBeenCalled();
      expect(screen.getByRole("textbox")).toHaveValue("0"); // original value
    });
    it("Should allow number terminating with decimal point", () => {
      act(() => {
        render(<BuildInput datatype="decimal" />);
      });
      const inputBox = screen.getByRole("textbox");
      userEvent.type(inputBox, "123.");
      expect(screen.getByRole("textbox")).toHaveValue("123."); // original value
    });
    it("Should indicate error if empty", () => {
      // setup
      act(() => {
        render(<BuildInput datatype="decimal" value="3" />);
      });

      //pre condition
      expect(document.querySelector(".Mui-error")).toBeFalsy();

      // exercise
      const inputBox = screen.getByRole("textbox");
      userEvent.type(inputBox, "{backspace}");

      // post condition
      expect(screen.getByRole("textbox")).toHaveValue(""); // original value
      expect(document.querySelector(".Mui-error")).toBeTruthy();
    });
  }); // onchange
  describe("Value", () => {
    it("Should be a property", () => {
      act(() => {
        render(<BuildInput value="123" />);
      });

      expect(screen.getByRole("textbox")).toHaveValue("123"); // original value
    });
    it("Should be a property not set", () => {
      act(() => {
        render(<BuildInput value={undefined} />);
      });
      expect(screen.getByRole("textbox")).toHaveValue(""); // original value
    });
    it("Should be a property set as number", () => {
      act(() => {
        render(<BuildInput value={321} />);
      });
      expect(screen.getByRole("textbox")).toHaveValue("321"); // original value
    });
  }); // describe Value
});
