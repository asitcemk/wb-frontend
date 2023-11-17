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
import { required, email } from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { emailInput } from "./../../../helper/input/email-input";
import { forget_password_email } from "../../../actions/common/auth";

const ForgotPasswordForm = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    pristine,
    submitting,
    showMessage,
    handleClose,
    handleLogin,
    setShowForgot,
    setShowOtp,
    setToken,
    setSentEmail,
    setType,
  } = props;

  const forgotPasswordSubmit = (values: any) => {
    values.user_type = 2;
    return forget_password_email(values, navigate).then((res) => {
      if (res.status === 200) {
        showMessage("success", res.data.message);
        setShowForgot(false);
        setShowOtp(true);
        setToken(res.data.result);
        setSentEmail(values.email);
        setType("forgot");
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(forgotPasswordSubmit)}>
      <DialogTitle id="login-dialog-title">{t("Forgot Password?")}</DialogTitle>
      <DialogContent className="login-dialog-cont">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Enter your email address to reset your password
          </Grid>
          <Grid item xs={12}>
            <Field
              name="email"
              component={emailInput}
              type="text"
              label={t("Email Address")}
              required={true}
              icon="icon-envelope"
              validate={[
                required({ message: t("Email Address is required.") }),
                email({ message: t("Please Enter a valid Email Address.") }),
              ]}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid
            item
            sm={12}
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
                {submitting ? <CircularProgress size={25} /> : t("Send")}
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            sm={12}
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Button color="secondary" onClick={handleLogin}>
              {t("Back to Login")}
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
  reduxForm({ form: "forgot-password-form" })(ForgotPasswordForm)
);
