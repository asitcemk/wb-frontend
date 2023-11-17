import React, { forwardRef, useImperativeHandle } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import { useTranslation } from "react-i18next";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Messages = forwardRef((props, ref) => {

  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState<AlertColor>('success');
  
  useImperativeHandle(ref, () => ({
      handleOpen(type:AlertColor,message:string) {
      setOpen(true);
      setType(type);
      setMessage(message);
    }
  }));


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  return (
      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'right'}} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {t(message)}
        </Alert>
      </Snackbar>
  );
})