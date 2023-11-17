import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import OtpInput from "react-otp-input";
import { WrappedFieldProps } from "redux-form";

interface OTPFieldProps {
  label?: string;
  required?: boolean;
  numInputs: number;
  autoFocus: boolean;
  isInputNum: boolean;
}

export const otpInput = (props: WrappedFieldProps & OTPFieldProps) => {
  const { touched, error } = props.meta;
  const { input, label, required, numInputs, autoFocus } = props;

  return (
    <FormControl
      className="otp"
      required={required}
      error={!!(touched && error)}
      fullWidth
    >
      <FormLabel>{label}</FormLabel>
      <OtpInput
        {...input}
        value={input.value}
        onChange={(value: string) => input.onChange(value)}
        numInputs={numInputs}
        shouldAutoFocus={autoFocus}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={{width:'50px', height: '50px'}}
      />
      {touched && error ? <FormHelperText>{error}</FormHelperText> : ""}
    </FormControl>
  );
};
