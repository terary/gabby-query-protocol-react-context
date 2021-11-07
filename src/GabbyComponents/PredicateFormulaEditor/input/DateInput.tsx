import { ExperimentalDateInputWithAppContext } from "../../common/experimental/ExperimentalDateInput";

const noopIsValid = (newValue: unknown) => true;

interface Props {
  formatMask: string;
  id: string;
  isValid?: (value: unknown) => boolean;
  label: string;
  name: string;
  onChange: (value: string) => void; // we'll allow empty strings
  value: string;
}
export const DateInput = ({
  formatMask,
  id,
  isValid = noopIsValid,
  label,
  name,
  onChange,
  value,
}: Props): JSX.Element => {
  return (
    <ExperimentalDateInputWithAppContext
      //      formatMask={getCurrentLocale().dateFormatMap}
      id={id}
      isValid={isValid}
      label={label}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};
