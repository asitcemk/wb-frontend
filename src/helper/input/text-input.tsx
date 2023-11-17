import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { WrappedFieldProps } from "redux-form";

interface TextFieldProps {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  type?: string;
}

export const textInput = (props: WrappedFieldProps & TextFieldProps) => {
  const { touched, error } = props.meta;
  const { input, label, type, required, placeholder, disabled, readonly } =
    props;

  return (
    <FormControl fullWidth required={required} error={!!(touched && error)}>
      <TextField
        error={!!(touched && error)}
        label={required ? label + " *" : label}
        placeholder={placeholder ?? ""}
        autoComplete="off"
        type={type}
        variant="outlined"
        helperText={touched && error}
        fullWidth
        {...input}
        disabled={disabled ?? false}
        value={input.value}
        InputProps={{
          readOnly: readonly ?? false,
        }}
        size="small"
      />
    </FormControl>
  );
};
