import EmailIcon from "@mui/icons-material/Email";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { WrappedFieldProps } from "redux-form";

interface EmailFieldProps {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  type?: string;
}

export const emailInput = (props: WrappedFieldProps & EmailFieldProps) => {
  const { touched, error } = props.meta;
  const { input, label, type, required, placeholder, disabled, readonly } =
    props;

  return (
    <FormControl fullWidth required={required} error={!!(touched && error)}>
      <TextField
        fullWidth
        error={!!(touched && error)}
        label={required ? label + " *" : label}
        type={type}
        variant="outlined"
        placeholder={placeholder ?? ""}
        helperText={touched && error}
        {...input}
        disabled={disabled ?? false}
        value={input.value}
        InputProps={{
          startAdornment: (
            <IconButton size="small">
              <EmailIcon />
            </IconButton>
          ),
          readOnly: readonly ?? false,
        }}
        size="small"
      />
    </FormControl>
  );
};
