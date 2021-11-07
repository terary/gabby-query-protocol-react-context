import React from "react";
import { SelectInputGeneric } from "./SelectInputGeneric";
import { TValueLabelList } from "gabby-query-protocol-lib";
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";

type PropsType<T> = {
  isMultiple: boolean;
  labelText: string;
  options: TValueLabelList;
  uniqueControlId: string;
  value: T;
  onChange: (value: T) => void;
};

interface IProps<T> {
  // isMultiple: boolean;
  labelText?: string;
  options?: TValueLabelList;
  uniqueControlId?: string;
  value?: T;
  onChange?: (value: T) => void;
}
type IPropsMultiSelect = IProps<(string | number)[]>;

const defaultPropertiesMultiSelect: IPropsMultiSelect = {
  labelText: "the label",
  options: [] as TValueLabelList,
  uniqueControlId: "testing-unique-controller-id",
  value: [],
  onChange: ([]) => {},
};

const RenderTestControl = (props: IPropsMultiSelect) => {
  const effectiveProps = {
    ...defaultPropertiesMultiSelect,
    ...props,
  } as PropsType<(number | string)[]>;
  return <SelectInputGeneric {...effectiveProps} />;
};

describe("SelectInputGeneric", () => {
  describe("Single Select", () => {
    it("Should be awesome", () => {
      expect("Awesome").toBe("Awesome");
    });
    it.skip("Should set name/id attributes", () => {
      act(() => {
        const result = render(
          <RenderTestControl uniqueControlId="my-id" labelText="the-label" />
        );

        const inputs = result.container.querySelectorAll("#my-id");
        expect(inputs.length).toBe(1);

        // const isMultiSelect = !!result.container.querySelector("select");
        // expect(isMultiSelect).toBe(true);

        // expect(inputs[0].getAttribute("type")).toBe("checkbox");
        expect(inputs).toBe("my-id");
      });
    });
  });
  describe("MultiSelect", () => {
    it("Should be with array if multiSelect.", () => {
      const changeHandler = jest.fn((_childChange: any) => {});
      act(() => {
        setupStatefulRender({
          onChange: changeHandler,
          isMultiple: true,
        });
      });

      fireEvent.mouseDown(screen.getByRole("button"));
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText(/Option One/i));
      fireEvent.click(listbox.getByText(/Option Three/i));
      expect(changeHandler).toHaveBeenCalledWith(["value1", "value3"]);
    });
  });
  describe("SingleSelect", () => {
    it.skip("Should be with array if multiSelect.", () => {
      const changeHandler = jest.fn((_childChange: any) => {});
      act(() => {
        setupStatefulRender({
          onChange: changeHandler,
          isMultiple: false,
        });
      });

      fireEvent.mouseDown(screen.getByLabelText("button"));
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText(/Option One/i));
      fireEvent.click(listbox.getByText(/Option Three/i));
      expect(changeHandler).toHaveBeenCalledWith("value3");
      expect(changeHandler).toHaveBeenCalledWith("value1");
    });
  });
});

// ------------------  Helpers
type ValueDataTypeArray = (string | number)[];
type ValueDataTypeScalar = string | number;
interface SelectProps<T> {
  isMultiple: boolean;
  labelText: string;
  options: TValueLabelList;
  uniqueControlId: string;
  value: T;
  onChange: (value: T) => void;
}
type PropertyObject = { [propName: string]: any };
const options = [
  { value: "value1", label: "Option One" },
  { value: "value2", label: "Option Two" },
  { value: "value3", label: "Option Three" },
] as TValueLabelList;

const StatefulWrapper = (props: SelectProps<ValueDataTypeArray | ValueDataTypeScalar>) => {
  const [selectedValues, setSelectedValues] = React.useState(
    [] as ValueDataTypeArray | ValueDataTypeScalar
  );
  const handleValueChange = (value: ValueDataTypeArray | ValueDataTypeScalar) => {
    setSelectedValues(value);
    props.onChange(value);
  };
  const effectiveProps: SelectProps<ValueDataTypeArray | ValueDataTypeScalar> = {
    ...props,
    ...{
      value: selectedValues,
      onChange: handleValueChange,
    },
  };

  return <SelectInputGeneric {...effectiveProps} />;
};

const setupStatefulRender = (
  focusProps: PropertyObject = {},
  testCaseName = "missing test case name"
) => {
  const effectiveProps = {
    ...focusProps,
  } as PropertyObject;

  effectiveProps.id = effectiveProps.id || testCaseName;
  effectiveProps.options = effectiveProps.options || options;
  effectiveProps.startValue = effectiveProps.startValue || "";

  effectiveProps.required = false;
  Object.keys(focusProps).forEach((propName) => {
    if (focusProps[propName] === null) {
      delete effectiveProps[propName];
    }
  });
  return render(
    <StatefulWrapper
      {...(effectiveProps as SelectProps<ValueDataTypeArray | ValueDataTypeScalar>)}
    />
  );
};
