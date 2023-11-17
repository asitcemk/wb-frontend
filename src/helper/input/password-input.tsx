import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { WrappedFieldProps } from 'redux-form';

interface PasswordFieldProps {
  label?: string;
  required?:boolean;
  placeholder?: string;
  showViewIcon?: boolean;
  clickShowPassword?: ()=>void;
  showPassword?:boolean;
}

export const passwordInput = (props: WrappedFieldProps & PasswordFieldProps) => {
  const { touched, error } = props.meta;
  const { input, label,required,placeholder,showViewIcon,clickShowPassword,showPassword } = props;

  return (
    <FormControl fullWidth required={required} error={!!(touched && error)}>
      <TextField
    fullWidth
    error={!!(touched && error)}
    label={(required)?label+" *":label}
    type={showPassword ? 'text' : 'password'}
    placeholder={placeholder??''}
    variant='outlined'
    autoComplete="off"
    helperText={touched && error}
    {...input}
    value={input.value}
     InputProps={{
            startAdornment: <IconButton size="small"><LockIcon/></IconButton>,
            endAdornment: (showViewIcon)?<IconButton size="small" onClick={clickShowPassword}>{showPassword?<VisibilityIcon />:<VisibilityOffIcon />}</IconButton>:null,
      }}
    size="small"
  />
    </FormControl>
  )
}