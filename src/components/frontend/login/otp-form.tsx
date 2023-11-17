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
import { otpInput } from "./../../../helper/input/otp-input";
import { verify_otp } from "../../../actions/common/auth";

const OTPForm = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    pristine,
    submitting,
    showMessage,
    handleClose,
    type,
    token,
    setShowOtp,
    setShowReset,
    sentEmail,
    handleForgot,
  } = props;

  const otpSubmit = (values: any) => {
    values.type = type;
    return verify_otp(values, navigate, token).then((res) => {
      if (res.status === 200) {
        showMessage("success", res.data.message);
        setShowOtp(false);
        if (type === "forgot") {
          setShowReset(true);
        } else {
          localStorage.setItem("_auth", token);
          localStorage.setItem("_user", JSON.stringify(res.data.user));
          handleClose();
          navigate("/my-account");
        }
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(otpSubmit)}>
      <DialogTitle id="login-dialog-title">
        {t("Verification Code")}
      </DialogTitle>
      <DialogContent className="login-dialog-cont">
        <Grid container spacing={2}>
          <Grid item xs={12} container justifyContent="center">
            Please type the verification code sent to {sentEmail}
          </Grid>
          <Grid
            className="frontend-otp"
            item
            xs={12}
            container
            justifyContent="center"
          >
            <Field
              required={true}
              name="otp"
              label={t("OTP")}
              component={otpInput}
              numInputs={6}
              autoFocus={false}
              isInputNum={true}
              validate={[
                required({ message: t("One Time Password is required.") }),
                length({
                  is: 6,
                  message: t(
                    "is the wrong length (should be {count, number} characters)."
                  ),
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
                {submitting ? <CircularProgress size={25} /> : t("Verify")}
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
            <Button color="secondary" onClick={handleForgot}>
              {t("Resend OTP")}
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
  reduxForm({ form: "otp-form" })(OTPForm)
);
