import { withGabbyPredicateFormulaContext } from "./input/TestUtilities";
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InputMux } from "./InputMux";
import {
  TPredicateOperator,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
} from "gabby-query-protocol-lib";
import React from "react";

const testPredicates = {
  dateField: {
    subjectId: "startDate",
    operator: "$gte" as TPredicateOperator,
    value: "2020-06-29T23:03:23-07:00",
  },
  decimalField: {
    value: 5000.01,
    subjectId: "annualIncome",
    operator: "$gt" as TPredicateOperator,
  },
  integerField: {
    value: 2,
    subjectId: "numberOfChildren",
    operator: "$gt" as TPredicateOperator,
  },
  multiSelectField: {
    subjectId: "region",
    operator: "$anyOf" as TPredicateOperator,
    value: ["US-WEST", "US-NORTH"],
  } as TPredicatePropertiesArrayValue,
  singleSelectField: {
    subjectId: "favoriteFruit",
    operator: "$oneOf" as TPredicateOperator,
    value: "GRAPE001",
  },
  textField: {
    operator: "$eq" as TPredicateOperator,
    value: "Awesome",
    subjectId: "firstName",
  },
};

type ComponentProperties = {
  id: string;
  labelText: string;
  name: string;
  onChange?: (newValue: any) => void;
  predicate: TPredicateProperties | TPredicatePropertiesArrayValue;
};

const BuildComponent = ({ id, labelText, name, predicate, onChange }: ComponentProperties) => {
  const [currentPredicate, setCurrentPredicate] = React.useState<
    TPredicatePropertiesArrayValue | TPredicateProperties
  >(predicate);

  const handleOnChange = (newValue: any) => {
    setCurrentPredicate({ ...currentPredicate, ...{ value: newValue } });
    if (onChange !== undefined) {
      onChange(newValue);
    }
  };

  return withGabbyPredicateFormulaContext({
    children: (
      <InputMux
        id={id}
        name={name}
        labelText={labelText}
        predicate={currentPredicate}
        onChange={handleOnChange}
      />
    ),
  });
};

describe("InputMux", () => {
  describe("text datatype field", () => {
    it("Should render text input field", () => {
      act(() => {
        render(
          <BuildComponent
            id="text-field-id"
            name="text-field-name"
            labelText="The Text Field"
            predicate={testPredicates.textField}
          />
        );
      });

      const textBox = screen.getByRole("textbox");

      expect(textBox.getAttribute("id")).toBe("text-field-id");
      expect(textBox.getAttribute("name")).toBe("text-field-name");
      expect(textBox.getAttribute("value")).toBe(testPredicates.textField.value);
      expect(screen.getByLabelText("The Text Field")).toBeInTheDocument();
    });
    it("Should be managed by parent", () => {
      const mockHandleChange = jest.fn();
      const testPredicate = { ...testPredicates.textField };
      testPredicate.value = "";
      act(() => {
        render(
          <BuildComponent
            id="text-field-id"
            name="text-field-name"
            labelText="The Text Field"
            onChange={mockHandleChange}
            predicate={testPredicate}
          />
        );
      });

      const textBox = screen.getByRole("textbox");
      userEvent.type(textBox, "hello world");
      expect(mockHandleChange).toBeCalledWith("hello world");
    });
  });
  describe("integer datatype field", () => {
    it("Should input for integers", () => {
      act(() => {
        render(
          <BuildComponent
            id="integer-field-id"
            name="integer-field-name"
            labelText="The Integer Field"
            predicate={testPredicates.integerField}
          />
        );
      });
      const textBox = screen.getByRole("textbox");
      const screenFieldValue = textBox.getAttribute("value") || "NO_VALUE_FOUND";

      expect(textBox.getAttribute("pattern")).toBe("/[0-9\\.]*/");
      expect(parseInt(screenFieldValue)).toBe(testPredicates.integerField.value);
      expect(textBox.getAttribute("name")).toBe("integer-field-name");
      expect(textBox.getAttribute("id")).toBe("integer-field-id");
      expect(screen.getByLabelText("The Integer Field")).toBeInTheDocument();
    });

    it("Should be managed by parent", () => {
      const mockHandleChange = jest.fn();
      const testPredicate = { ...testPredicates.integerField };
      testPredicate.value = 0;
      act(() => {
        render(
          <BuildComponent
            id="integer-field-id"
            name="integer-field-name"
            labelText="The Integer Field"
            onChange={mockHandleChange}
            predicate={testPredicate}
          />
        );
      });

      const textBox = screen.getByRole("textbox");
      userEvent.type(textBox, "{backspace}42");
      expect(mockHandleChange).toBeCalledWith(42);
    });
  });
  describe("decimal datatype, should render number field", () => {
    it("Should render decimal", () => {
      act(() => {
        render(
          <BuildComponent
            id="decimal-field-id"
            name="decimal-field-name"
            labelText="The Decimal Field"
            predicate={testPredicates.decimalField}
          />
        );
      });
      const textBox = screen.getByRole("textbox");
      const screenFieldValue = textBox.getAttribute("value") || "NO_VALUE_FOUND";

      expect(textBox.getAttribute("pattern")).toBe("/[0-9\\.]*/");
      expect(parseFloat(screenFieldValue)).toBe(testPredicates.decimalField.value);
      expect(textBox.getAttribute("name")).toBe("decimal-field-name");
      expect(textBox.getAttribute("id")).toBe("decimal-field-id");
      expect(screen.getByLabelText("The Decimal Field")).toBeInTheDocument();
    });
    it("Should be managed by parent", () => {
      const mockHandleChange = jest.fn();
      const testPredicate = { ...testPredicates.decimalField };
      testPredicate.value = 1.01;
      act(() => {
        render(
          <BuildComponent
            id="decimal-field-id"
            name="decimal-field-name"
            labelText="The Decimal Field"
            onChange={mockHandleChange}
            predicate={testPredicate}
          />
        );
      });

      const textBox = screen.getByRole("textbox");
      userEvent.type(textBox, "{backspace}{backspace}3.1416");
      expect(mockHandleChange).toBeCalledWith(3.1416);
    });
  });
  it("Should render date", () => {
    act(() => {
      render(
        <BuildComponent
          id="date-field-id"
          name="date-field-name"
          labelText="The Date Field"
          predicate={testPredicates.dateField}
        />
      );
    });
    const textBox = screen.getByRole("textbox");
    const screenFieldValue = textBox.getAttribute("value") || "NO_VALUE_FOUND";
    expect(screenFieldValue).toBe("30/06/2020");
  });
  describe("Multi-select datatype", () => {
    it("Should render multi-select", () => {
      act(() => {
        render(
          <BuildComponent
            id="multiSelect-field-id"
            name="multiSelect-field-name"
            labelText="The MultiSelect Field"
            predicate={testPredicates.multiSelectField}
          />
        );
      });
      const openDropdownButton = screen.getByRole("button");
      expect(openDropdownButton).toBeInTheDocument();
    });
    it("Should render multi-select (empty value)", () => {
      const testPredicate = { ...testPredicates.multiSelectField };

      //@ts-ignore;
      testPredicate.value = "";
      act(() => {
        render(
          <BuildComponent
            id="multiSelect-field-id"
            name="multiSelect-field-name"
            labelText="The MultiSelect Field"
            predicate={testPredicates.multiSelectField}
          />
        );
      });
      const openDropdownButton = screen.getByRole("button");
      expect(openDropdownButton).toBeInTheDocument();
    });
    it("Should be managed by parent", () => {
      const mockHandleChange = jest.fn();
      const testPredicate = { ...testPredicates.multiSelectField };
      //@ts-ignore
      testPredicate.value = ""; // [] as (string | number)[];
      // testPredicate.value = [] as (string | number)[];
      act(() => {
        render(
          <BuildComponent
            id="integer-field-id"
            name="integer-field-name"
            labelText="The Integer Field"
            onChange={mockHandleChange}
            predicate={testPredicate}
          />
        );
      });
      const openDropdownButton = screen.getByRole("button");
      expect(openDropdownButton).toBeInTheDocument();

      fireEvent.mouseDown(screen.getByRole("button"));
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText(/US West/i));
      fireEvent.click(listbox.getByText(/US East/i));
      expect(mockHandleChange).toHaveBeenCalledWith(["US-WEST"]);
      expect(mockHandleChange).toHaveBeenCalledWith(["US-WEST", "US-EAST"]);
    });
  });

  it("Should render single-select", () => {
    act(() => {
      render(
        <BuildComponent
          id="singleSelect-field-id"
          name="singleSelect-field-name"
          labelText="The SingleSelect Field"
          predicate={testPredicates.singleSelectField}
        />
      );
    });
    const openDropdownButton = screen.getByRole("button");
    expect(openDropdownButton).toBeInTheDocument();
  });

  it.skip("Should test boolean", () => {});
});
