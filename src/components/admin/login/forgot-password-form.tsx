import { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { required, email } from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import { emailInput } from "../../../helper/input/email-input";
import { forget_password_email } from "../../../actions/common/auth";

const ForgotPasswordForm = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();

  const forgotPasswordSubmit = (values: any) => {
    values.user_type = 1;
    return forget_password_email(values, navigate).then((res) => {
      if (res.status === 200) {
        showMessage("success", res.data.message);
        setShowForgot(false);
        setShowOtp(true);
        setToken(res.data.result);
        setSentEmail(values.email);
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  const {
    handleSubmit,
    pristine,
    submitting,
    handleLogin,
    setShowForgot,
    setShowOtp,
    setToken,
    setSentEmail,
  } = props;
  return (
    <form onSubmit={handleSubmit(forgotPasswordSubmit)}>
      <Grid container spacing={2} justifyContent="center">
        <h1>Forgot Password?</h1>
        <p>Enter your email address to reset your password</p>
        <Grid item sm={12} xs={12}>
          <Field
            name="email"
            component={emailInput}
            type="text"
            label={t("Email address")}
            placeholder={t("Email address")}
            icon="icon-envelope"
            required={true}
            validate={[
              required({ message: t("Email Address is required.") }),
              email({ message: t("Please Enter a valid Email Address.") }),
            ]}
          />
        </Grid>
        <Grid container item sm={12} xs={12} justifyContent="flex-end">
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            disabled={pristine || submitting}
          >
            {submitting ? <CircularProgress size={20} /> : "Send"}
          </Button>
        </Grid>
        <Grid container item sm={12} xs={12} justifyContent="center">
          <a href="#" onClick={handleLogin}>
            Back to Login
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
  reduxForm({ form: "forgot-password" })(ForgotPasswordForm)
);
