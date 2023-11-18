import FormControl from "@mui/material/FormControl";
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { WrappedFieldProps } from "redux-form";

interface IOptions{
  value: string;
  label: string;
}

interface RadioFieldProps {
  label?: string;
  required?: boolean;
  options: IOptions[]
}

export const radioInput = (props: WrappedFieldProps & RadioFieldProps) => {
  const { touched, error } = props.meta;
  const { input, label, required, options } =
    props;

  return (
    <FormControl required={required} error={!!(touched && error)} component="fieldset">
  <FormLabel >{label}</FormLabel>
    <RadioGroup
    style={{ display: 'initial',width: 'auto' }}
    {...input}
    value={input.value}
    onChange={(event, value) => input.onChange(value)}
    >
    {options.map((item: IOptions,index:number) => (
      <FormControlLabel key={index} value={item.value} control={<Radio />} label={(item.label)?item.label:item.value} labelPlacement="end" />
    ))}

    </RadioGroup>
    
     {(touched && error)?<FormHelperText>{error}</FormHelperText>:""}
    </FormControl>
  );
};
