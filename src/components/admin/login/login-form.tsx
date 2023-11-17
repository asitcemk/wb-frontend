import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { useState } from "react";
import { required, email, length } from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { checkboxInput } from "./../../../helper/input/checkbox-input";
import { emailInput } from "./../../../helper/input/email-input";
import { passwordInput } from "./../../../helper/input/password-input";
import { ApiUrls } from "./../../../api-urls";
import { login } from "./../../../actions/common/auth";

const LoginForm = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginSubmit = (values: any, dispatch: any) => {
    return login(ApiUrls.ADMINLOGIN, values, dispatch, navigate).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("_admin_auth", res.data);
        const redirectUrl =
          localStorage.getItem("_return_url") ?? "/admin/dashboard";
        navigate(redirectUrl);
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  const { handleSubmit, pristine, submitting, handleForgot } = props;
  return (
    <form onSubmit={handleSubmit(loginSubmit)}>
      <Grid container spacing={2} justifyContent="center">
        <h1>Admin Login</h1>
        <Grid item sm={12} xs={12}>
          <Field
            name="email"
            component={emailInput}
            type="text"
            label={t("Email Address")}
            placeholder={t("Email Address")}
            required={true}
            validate={[
              required({ message: t("Email Address is required.") }),
              email({
                message: t("Please Enter a valid Email Address."),
              }),
            ]}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="password"
            component={passwordInput}
            label={t("Password")}
            placeholder={t("Password")}
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
        <Grid item sm={8} xs={12}>
          <Field
            name="remember"
            component={checkboxInput}
            checkText={t("Remember Me")}
          />
        </Grid>
        <Grid container item sm={4} xs={12} justifyContent="flex-end">
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            disabled={pristine || submitting}
          >
            {submitting ? <CircularProgress size={20} /> : "Login"}
          </Button>
        </Grid>
        <Grid container item sm={12} xs={12} justifyContent="center">
          <a href="#" onClick={handleForgot}>
            Forgot your password?
          </a>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(mapStateToProps)(
  reduxForm({ form: "admin-login" })(LoginForm)
);
