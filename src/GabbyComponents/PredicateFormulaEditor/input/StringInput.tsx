/* eslint-disable import/prefer-default-export */
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

interface IProps {
  id: string;
  labelText: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
}

export const StringInput = ({ id, labelText, name, onChange, value }: IProps): JSX.Element => {
  const handleValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const inputValue = event.target.value as string;
    onChange(inputValue);
  };

  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <TextField
        id={id}
        name={name}
        label={labelText}
        value={value}
        onChange={handleValueChange}
        variant="outlined"
        type="text"
      />
    </FormControl>
  );
};
