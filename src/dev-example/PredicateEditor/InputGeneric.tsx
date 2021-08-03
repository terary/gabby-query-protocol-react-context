import React, { useEffect, useState } from "react";

interface Props {
  value: string | number;
  onChange: (currentValue: string | number) => void;
}

const InputGeneric = ({ onChange, value }: Props): JSX.Element => {
  // const [currentValue, setCurrentValue] = useState("");

  const handleCurrentValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setCurrentValue(e.target.value);
    onChange(e.target.value);
  };

  return <input value={value} onChange={handleCurrentValueChange} />;
};

export default InputGeneric;
