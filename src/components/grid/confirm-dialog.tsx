import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { AlertColor } from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate, useOutletContext } from "react-router-dom";
import { statusChange, deleteData } from "../../actions/common/grid";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog(props: any) {
  const { t } = useTranslation();
  const {
    open,
    selected,
    token,
    confirmType,
    statusApi,
    deleteApi,
    refreshGrid,
    handleClose,
  } = props;
  const navigate = useNavigate();
  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (confirmType === "delete") {
      let formValues: any = {};
      formValues.ids = selected;
      deleteData(deleteApi, formValues, navigate, token).then((res) => {
        if (res.status === 200) {
          showMessage("success", res.data.message);
          refreshGrid();
          handleClose();
        }
      });
    } else {
      let formValues: any = {};
      formValues.ids = selected;
      formValues.status = confirmType === "activate" ? true : false;
      statusChange(statusApi, formValues, navigate, token).then((res) => {
        if (res.status === 200) {
          showMessage("success", res.data.message);
          refreshGrid();
          handleClose();
        }
      });
    }
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-dialog-title"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle id="confirm-dialog-title">{t("Confirmation!")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {t("Are you sure you want to")} {t(confirmType)}{" "}
          {selected.length === 1 ? t("this") : t("these")} {t("data?")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          No
        </Button>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
