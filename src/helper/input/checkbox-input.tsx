import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { WrappedFieldProps } from 'redux-form';

interface CheckboxFieldProps {
  required?:boolean;
  checkText:string;
}

export const checkboxInput = (props: WrappedFieldProps & CheckboxFieldProps) => {
  const { touched, error } = props.meta;
  const { input,required,checkText } = props;

  return (
    <FormControl fullWidth required={required} error={!!(touched && error)}>
      <FormControlLabel control={<Checkbox {...input} checked={(input.value)?true:false} onChange={(value:any) => input.onChange(value)} value={input.value}/>} label={checkText}/>
    {(touched && error)?<FormHelperText>{error}</FormHelperText>:null}
    </FormControl>
  )
}