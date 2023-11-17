import FormControl from "@mui/material/FormControl";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { WrappedFieldProps } from "redux-form";

interface MobileFieldProps {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  type?: string;
}

function MobileFieldComponent(props: any) {
  const { ...other } = props;
  return (
    <MaskedInput
      {...other}
      // ref={(ref) => {
      //   inputRef(ref ? ref.inputElement : null);
      // }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
    />
  );
}

export const mobileInput = (props: WrappedFieldProps & MobileFieldProps) => {
  const { touched, error } = props.meta;
  const { input, label, type, required } =
    props;

  return (
    <FormControl fullWidth required={required} error={!!(touched && error)}>
      <TextField
        fullWidth
        error={!!(touched && error)}
        label={required ? label + " *" : label}
        type={type}
        variant="outlined"
        helperText={touched && error}
        {...input}
        value={input.value}
        InputProps={{
          inputComponent: MobileFieldComponent,
        }}
        size="small"
      />
    </FormControl>
  );
};
