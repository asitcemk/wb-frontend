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
import { required, length } from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { passwordInput } from "./../../../helper/input/password-input";
import { checkboxInput } from "./../../../helper/input/checkbox-input";
import { emailInput } from "./../../../helper/input/email-input";
import { ApiUrls } from "../../../api-urls";
import { login } from "../../../actions/common/auth";

const LoginForm = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    pristine,
    submitting,
    handleClose,
    handleForgot,
    handleSignup,
    setShowLogin,
    setShowOtp,
    setToken,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginSubmit = (values: any, dispatch: any) => {
    return login(ApiUrls.USERLOGIN, values, dispatch, navigate).then((res) => {
      if (res.status === 200) {
        handleClose();
        localStorage.setItem("_auth", res.data.token);
        localStorage.setItem("_user", JSON.stringify(res.data.user));
        navigate("/my-account");
      } else if (res.status === 203) {
        setShowLogin(false);
        setShowOtp(true);
        setToken(res.data.result);
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(loginSubmit)}>
      <DialogTitle id="login-dialog-title">{t("Login")}</DialogTitle>
      <DialogContent style={{ padding: "15px" }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Field
              name="email"
              component={emailInput}
              type="text"
              label={t("Email/Mobile")}
              required={true}
              icon="icon-user"
              validate={[required({ message: t("Email/Mobile is required.") })]}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="password"
              component={passwordInput}
              label={t("Password")}
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid
            item
            sm={5}
            xs={12}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <Field
              name="remember"
              component={checkboxInput}
              checkText={t("Remember Me")}
            />
          </Grid>
          <Grid
            item
            sm={7}
            xs={12}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <Stack spacing={2} direction="row">
              <Button
                onClick={handleClose}
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
                {submitting ? <CircularProgress size={25} /> : t("Login")}
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            sm={12}
            xs={12}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button color="secondary" onClick={handleForgot}>
              {t("Forgot your password?")}
            </Button>
          </Grid>
          <Grid
            item
            sm={5}
            xs={5}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <p>{t("Not a Member?")}</p>
          </Grid>
          <Grid item sm={2} xs={2}></Grid>
          <Grid
            item
            sm={5}
            xs={5}
            container
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button color="primary" onClick={handleSignup}>
              {t("Register")}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </form>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(mapStateToProps)(
  reduxForm({ form: "login-form" })(LoginForm)
);
