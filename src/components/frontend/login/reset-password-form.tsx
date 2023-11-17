import { useState } from "react";
import { connect } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, reduxForm } from "redux-form";
import { SubmissionError } from "redux-form";
import {
  required,
  length,
  confirmation,
} from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { passwordInput } from "./../../../helper/input/password-input";
import {
  resetPassword,
} from "../../../actions/common/auth";

const ResetPasswordForm = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    pristine,
    submitting,
    showMessage,
    handleLogin,
    token,
    setShowReset,
    setShowLogin,
    setToken,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const passwordSubmit = (values: any) => {
    return resetPassword(values, navigate, token).then((res) => {
      if (res.status === 200) {
        showMessage("success", res.data.message);
        setShowReset(false);
        setShowLogin(true);
        setToken("");
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(passwordSubmit)}>
      <DialogTitle id="login-dialog-title">{t("Reset Password")}</DialogTitle>
      <DialogContent style={{ padding: "15px" }}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Field
              name="password"
              component={passwordInput}
              label={t("New Password")}
              required={true}
              showViewIcon={true}
              showPassword={showPassword}
              clickShowPassword={clickShowPassword}
              validate={[
                required({ message: t("Password is required.") }),
                length({
                  min: 6,
                  message:
                    t("Minimum") +
                    " {count, number} " +
                    t("length password is required."),
                }),
              ]}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Field
              name="password_confirmation"
              component={passwordInput}
              label={t("Confirm Password")}
              required={true}
              validate={[
                confirmation({
                  field: "password",
                  fieldLabel: "Password",
                  message: t("Confirm Password doesn't match with Password."),
                }),
              ]}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row">
          <Button
            onClick={handleLogin}
            size="medium"
            variant="outlined"
            color="secondary"
          >
            {t("Cancel")}
          </Button>
          <Button
            type="submit"
            size="medium"
            variant="contained"
            color="primary"
            disabled={pristine || submitting}
          >
            {submitting ? <CircularProgress size={25} /> : t("Continue")}
          </Button>
        </Stack>
      </DialogActions>
    </form>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(mapStateToProps)(
  reduxForm({ form: "reset-password-form" })(ResetPasswordForm)
);
