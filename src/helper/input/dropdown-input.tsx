import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { WrappedFieldProps } from "redux-form";

interface IOptions {
  label: string;
  value: string;
  img?: string;
}

interface DropdownFieldProps {
  label?: string;
  required?: boolean;
  novalue?: string;
  options: IOptions[];
}

export const dropdownInput = (
  props: WrappedFieldProps & DropdownFieldProps
) => {
  const { touched, error } = props.meta;
  const { input, label, required, novalue, options } = props;

  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      error={!!(touched && error)}
    >
      <InputLabel id="select-outlined-label">
        {required ? label + " *" : label}
      </InputLabel>
      <Select
        {...input}
        fullWidth
        labelId="select-outlined-label"
        value={input.value}
        onChange={(value) => input.onChange(value)}
        error={!!(touched && error)}
        label={required ? label + " *" : label}
      >
        {novalue ? <MenuItem>{novalue}</MenuItem> : null}
        {options && options.length > 0
          ? options.map((x, i) => (
              <MenuItem key={i} value={x.value}>
                {x.img ? (
                  <img
                    src={x.img}
                    width="30px"
                    height="25px"
                    style={{ marginRight: "6px" }}
                  />
                ) : null}
                {x.label}
              </MenuItem>
            ))
          : null}
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : ""}
    </FormControl>
  );
};
