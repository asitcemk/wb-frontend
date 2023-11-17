import { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { required, length } from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useOutletContext, useNavigate } from "react-router-dom";

import { otpInput } from "../../../helper/input/otp-input";
import { verify_otp } from "../../../actions/common/auth";

const VerifyOTPForm = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();

  const otpSubmit = (values: any) => {
    values.type = "forgot";
    return verify_otp(values, navigate, token).then((res) => {
      if (res.status === 200) {
        showMessage("success", res.data.message);
        setShowReset(true);
        setShowOtp(false);
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
    sentEmail,
    setShowReset,
    setShowOtp,
    handleForgot,
  } = props;
  return (
    <form onSubmit={handleSubmit(otpSubmit)}>
      <Grid container spacing={2} justifyContent="center" className="admin-otp">
        <h1>Verification Code</h1>
        <p>Please type the verification code sent to {sentEmail}</p>
        <Grid container item sm={12} xs={12} justifyContent="center">
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
        <Grid container item sm={12} xs={12} justifyContent="flex-end">
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            disabled={pristine || submitting}
          >
            {submitting ? <CircularProgress size={20} /> : "Verify"}
          </Button>
        </Grid>
        <Grid container item sm={12} xs={12} justifyContent="center">
          <a href="#" onClick={handleForgot}>
            Resend OTP
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
  reduxForm({ form: "verify-otp" })(VerifyOTPForm)
);
