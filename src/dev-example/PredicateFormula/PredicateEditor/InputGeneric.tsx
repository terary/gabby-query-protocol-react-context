import React from "react";

interface Props {
  value: string | number;
  htmlInputType?: "datetime" | "checkbox" | "number" | "text";
  onChange: (currentValue: string | number) => void;
}

const InputGeneric = ({
  onChange,
  value,
  htmlInputType = "text",
}: Props): JSX.Element => {
  /**
   * The htmlInputType doesn't work as expected.
   * When changing the datatype the input type changes
   * but the browser doesn't repaint.
   *
   * This project is suppose to be proof-of-concept - not fixing this issue.
   */
  const handleCurrentValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <input type={htmlInputType} value={value} onChange={handleCurrentValueChange} />;
};
InputGeneric.defaultProps = {
  htmlInputType: "text",
};
export default InputGeneric;
