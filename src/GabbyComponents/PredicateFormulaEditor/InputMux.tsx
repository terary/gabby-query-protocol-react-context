import type {
  TPredicateOperator,
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
} from "gabby-query-protocol-lib";

import { usePredicateTreeUtilities } from "../../GabbyQueryProtocol/PredicateFormula";
import { DateInput } from "./input/DateInput";
import { NumberInput } from "./input/NumberInput";
import { StringInput } from "./input/StringInput";
import { SelectInputGeneric } from "./input/SelectInputGeneric";

type ValueType = number | string | (number | string)[]; // do not export.  If export is necessary change name T... (no "Type"), the convention

const isMultiSelectOperator = (operator: TPredicateOperator) => {
  return operator === "$anyOf" || operator === "$oneOf";
};

interface IProps {
  id: string;
  labelText?: string;
  name: string;
  onChange: (value: ValueType) => void;
  predicate: TPredicateProperties | TPredicatePropertiesArrayValue;
}

export const InputMux = ({
  id,
  labelText = "Value",
  name,
  onChange,
  predicate,
}: IProps): JSX.Element => {
  const { getSelectOptions, getSubjectById } = usePredicateTreeUtilities();

  // TODO - *tmc*
  // does this need to be in effect?
  const subject = getSubjectById(predicate.subjectId);

  const handleDateInputChange = (newValue: string) => {
    // using experiment date-picker test coverage sux
    onChange(newValue);
  };

  const handleDecimalChange = (newValue: number | string) => {
    onChange(newValue);
  };

  if (isMultiSelectOperator(predicate.operator)) {
    // const optionList = getSelectOptions(predicate);
    //     getSelectOptions: (subjectId: string, operator: TPredicateOperator) => {

    const optionList = getSelectOptions(predicate.subjectId, predicate.operator);

    if (predicate.operator === "$oneOf") {
      return (
        <SelectInputGeneric
          isMultiple={false}
          labelText="Value"
          uniqueControlId={predicate.subjectId} // this maybe a bad idea,
          options={optionList}
          value={predicate.value as number | string}
          onChange={onChange}
        />
      );
    }

    let valueAsArray: (number | string)[];
    if (predicate.value === "") {
      valueAsArray = [];
    } else if (!Array.isArray(predicate.value)) {
      // coverage - this is not covered
      valueAsArray = [predicate.value]; // does this produce array or object?
    } else {
      valueAsArray = predicate.value;
    }

    return (
      <SelectInputGeneric
        isMultiple
        labelText="Value"
        options={optionList}
        uniqueControlId={predicate.subjectId} // this maybe a bad idea,
        value={
          Array.isArray(predicate.value)
            ? (predicate.value as (number | string)[])
            : valueAsArray
        }
        onChange={onChange}
      />
    );
  }
  if (subject.datatype === "datetime") {
    return (
      <DateInput
        formatMask="__/__/____"
        value={predicate.value as string}
        onChange={handleDateInputChange}
        id="theDatePicker"
        name="theDatePicker"
        label="value"
      />
    );
  }
  if (subject.datatype === "decimal") {
    return (
      <NumberInput
        datatype="decimal"
        id={id}
        label={labelText}
        name={name}
        onChange={handleDecimalChange}
        value={predicate.value as string}
      />
    );
  }
  if (subject.datatype === "integer") {
    return (
      <NumberInput
        datatype="integer"
        id={id}
        label={labelText}
        name={name}
        onChange={handleDecimalChange}
        value={predicate.value as string}
      />
    );
  }
  return (
    <StringInput
      id={id}
      labelText={labelText}
      name={name}
      onChange={onChange}
      value={predicate.value as string}
    />
  );
};

InputMux.defaultProps = {
  labelText: "Value",
};
