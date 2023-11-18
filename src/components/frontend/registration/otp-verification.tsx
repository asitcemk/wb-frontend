import { AlertColor } from "@mui/material/Alert";
import { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  required,
  length,
} from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { otpInput } from "./../../../helper/input/otp-input";
import { scrollToFirstError } from "../../../helper/commonFunctions";
import { verify_otp, resend_otp } from "../../../actions/common/auth";

function OtpVerification(props: any) {
  const { t } = useTranslation();
  const { handleSubmit, pristine, submitting } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();

  const otpSubmit = (values: any) => {
    values.type = "active";
    const token: string = localStorage.getItem("_temp_auth") ?? "";
    return verify_otp(values, navigate, token).then((res) => {
      if (res.status === 200) {
        showMessage("success", res.data.message);
        localStorage.setItem("_auth", token);
        localStorage.setItem("_user", JSON.stringify(res.data.user));
        localStorage.removeItem("_temp_auth");
        localStorage.removeItem("_e");
        navigate("/my-account");
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  const resendOTP = () => {
    setLoading(true);
    const token: string = localStorage.getItem("_temp_auth") ?? "";
    return resend_otp(navigate, token).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        showMessage("success", res.data.message);
      } else {
        showMessage("error", res.data.message);
      }
    });
  };

  const cancel = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(otpSubmit)}>
        <Grid container justifyContent="center" alignItems="center">
          <div>
            <h1>{t("Verification Code")}</h1>
            <Typography>
              {t("Please type the verification code sent to")}{" "}
              {localStorage.getItem("_e")}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item sm={12} xs={12}>
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
              <Grid
                item
                container
                sm={12}
                xs={12}
                justifyContent="flex-end"
                onClick={resendOTP}
              >
                <Button color="secondary" size="medium" disabled={loading}>
                  {loading ? <CircularProgress size={25} /> : t("Resend OTP")}
                </Button>
              </Grid>
              <Grid item container sm={12} xs={12} justifyContent="flex-end">
                <Stack spacing={2} direction="row">
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    className="button"
                    onClick={cancel}
                  >
                    {t("Cancel")}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={pristine || submitting}
                    color="primary"
                    size="medium"
                    className="button"
                  >
                    {submitting ? <CircularProgress size={25} /> : t("Virify")}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </form>
    </Container>
  );
}
const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "otp-verification",
    onSubmitFail: (errors) => {
      scrollToFirstError(errors);
    },
  })(OtpVerification)
);
