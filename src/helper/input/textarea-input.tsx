import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import { WrappedFieldProps } from 'redux-form';

interface TextAreaFieldProps {
  disabled?:boolean;
  label?: string;
  name?:string
  required?:boolean;
  rows?: number;
  maxLength?: number;
  countMsg?: string;
}

export const textAreaInput = (props: WrappedFieldProps & TextAreaFieldProps) => {
  const { touched, error } = props.meta;
  const { input, label,required,disabled,rows, maxLength, countMsg } = props;

  return (
    <>
    <FormControl fullWidth size="small" required={required} error={!!(touched && error)}>
      <TextField
        error={!!(touched && error)}
        label={(required)?label+" *":label}
        variant='outlined'
        multiline
        rows={rows?rows:4}
        margin="normal"
        helperText={touched && error}
        disabled={disabled?true:false}
        fullWidth
        {...input}
        value={input.value}
        size="small"
      />
    </FormControl>
    <Grid container justifyContent="flex-end">
      {maxLength?<FormHelperText className="character-count">{(input.value)?(maxLength-input.value.length):maxLength} {countMsg}</FormHelperText>:null}
    </Grid>
  </>
  )
}