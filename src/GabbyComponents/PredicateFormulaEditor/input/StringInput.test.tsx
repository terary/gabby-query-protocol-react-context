import React from "react";
import { StringInput } from "./StringInput";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

interface IPropsTest {
  id?: string;
  labelText?: string;
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
}

interface IProps {
  id: string;
  labelText: string;
  name: string;
  onChange: (value: string) => void;
  value?: string;
}

const defaultProps: IProps = {
  id: "string-input-id",
  labelText: "the label text",
  name: "string-input-name",
  onChange: (value: string) => {},
  // value: "",
};

const BuildStatefulInput = (props: IPropsTest) => {
  const effectiveProps: IProps = { ...defaultProps, ...props };

  const [val, setVal] = React.useState<string | undefined>(effectiveProps.value);
  const defaultHandleOnChange = (inputValue: string): void => {
    setVal(inputValue);
    effectiveProps.onChange(inputValue);
  };
  const onChange = props.onChange || defaultHandleOnChange;

  if (effectiveProps.onChange === undefined) {
    effectiveProps.onChange = onChange;
  }
  if (effectiveProps.value === undefined) {
    effectiveProps.value = val;
  }

  //@ts-ignore
  return <StringInput {...effectiveProps} value={val} />;
};

describe("StringInput", () => {
  it("Should display set: id, label name, value", () => {
    act(() => {
      render(<BuildStatefulInput value="My Awesome Value" />);
    });
    const textbox = screen.getByRole("textbox");
    expect(textbox).toBeInTheDocument();
    expect(textbox.getAttribute("name")).toBe("string-input-name");
    expect(textbox.getAttribute("id")).toBe("string-input-id");
    expect(textbox.getAttribute("value")).toBe("My Awesome Value");
    expect(screen.getByLabelText("the label text")).toBeInTheDocument();
  });
  it("Should be managed by parent", () => {
    const mockOnChange = jest.fn();
    act(() => {
      render(<BuildStatefulInput onChange={mockOnChange} />);
    });
    const textbox = screen.getByRole("textbox");
    userEvent.type(textbox, "hello world");
    expect(mockOnChange).toBeCalledWith("hello world");
  });
});
