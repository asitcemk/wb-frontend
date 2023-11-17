import { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { useState } from "react";
import { required, length, confirmation } from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useOutletContext, useNavigate } from "react-router-dom";
import { passwordInput } from "../../../helper/input/password-input";

import { resetPassword } from "../../../actions/common/auth";

const ResetPasswordForm = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const {
    handleSubmit,
    pristine,
    submitting,
    token,
    setShowReset,
    setShowLogin,
    setToken,
    handleLogin,
  } = props;
  return (
    <form onSubmit={handleSubmit(passwordSubmit)}>
      <Grid container spacing={2} justifyContent="center">
        <h1>Reset Password</h1>
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
        <Grid container item sm={12} xs={12} justifyContent="flex-end">
          <Stack spacing={2} direction="row">
            <Button
              size="small"
              onClick={handleLogin}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              disabled={pristine || submitting}
            >
              {submitting ? <CircularProgress size={20} /> : "Continue"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(mapStateToProps)(
  reduxForm({ form: "reset-password" })(ResetPasswordForm)
);
