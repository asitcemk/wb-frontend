import { AlertColor } from "@mui/material/Alert";
import { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, reduxForm, SubmissionError } from "redux-form";
import {
  required,
  email,
  length,
  confirmation,
  format,
  acceptance,
} from "redux-form-validators";
import { useOutletContext, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import { textInput } from "./../../../helper/input/text-input";
import { dropdownInput } from "./../../../helper/input/dropdown-input";
import { passwordInput } from "./../../../helper/input/password-input";
import { checkboxInput } from "./../../../helper/input/checkbox-input";
import { emailInput } from "./../../../helper/input/email-input";
import { radioInput } from "./../../../helper/input/radio-input";
import { mobileInput } from "./../../../helper/input/mobile-input";
import { scrollToFirstError } from "../../../helper/commonFunctions";
import { signup } from "./../../../actions/common/auth";

function Registration(props: any) {
  const { t, handleSubmit, pristine, reset, submitting } = props;
  const navigate = useNavigate();

  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();
  const [showPassword, setShowPassword] = useState(false);
  const [genderList] = useState([
    { value: "Male", label: t("Male") },
    { value: "Female", label: t("Female") },
  ]);
  const [codeOptions] = useState([
    {
      value: "+91",
      label: "+91",
      img: "/flags-small/in.png",
    },
  ]);
  

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submit = (values: any, dispatch: any) => {
    return signup(values, navigate).then((res) => {
      if (res.status === 201) {
        showMessage("success", res.data.message);
        localStorage.setItem("_temp_auth", res.data.result);
        localStorage.setItem("_e", values.email);
        dispatch(reset("registration"));
        navigate("/otp-verification");
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2} marginTop={2}>
          <Grid item sm={8}>
            <Card>
              <img src="/img/r-bg.jpg" width={"100%"} />
            </Card>
          </Grid>
          <Grid item sm={4}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Typography component="h5" variant="h5">
                  {t("Create an Wowbridge account")}
                </Typography>
                <Typography color="secondary">{t("It's Free")}</Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field
                  name="first_name"
                  component={textInput}
                  type="text"
                  label={t("First Name")}
                  required={true}
                  validate={[
                    required({ message: t("The First name is required.") }),
                    length({
                      in: [2, 20],
                      message: t("Characters length must be between 4 to 20."),
                    }),
                    format({
                      with: /^[a-z]+$/i,
                      message: t("Only allows letters"),
                    }),
                  ]}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field
                  name="last_name"
                  component={textInput}
                  type="text"
                  label={t("Last Name")}
                  required={true}
                  validate={[
                    required({ message: t("The last name is required.") }),
                    length({
                      in: [2, 20],
                      message: t("Characters length must be between 4 to 20."),
                    }),
                    format({
                      with: /^[a-z]+$/i,
                      message: t("Only allows letters"),
                    }),
                  ]}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Field
                  name="email"
                  component={emailInput}
                  type="text"
                  label={t("Email Address")}
                  required={true}
                  validate={[
                    required({ message: t("Email Address is required.") }),
                    email({
                      message: t("Please Enter a valid Email Address."),
                    }),
                  ]}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Field
                  name="countrycode"
                  required={true}
                  options={codeOptions}
                  component={dropdownInput}
                  label={t("Code")}
                  novalue={t("select") + " " + t("code")}
                  validate={[
                    required({ message: t("Country code is required.") }),
                  ]}
                />
              </Grid>
              <Grid item sm={8} xs={8}>
                <Field
                  name="mobile"
                  component={mobileInput}
                  type="text"
                  label={t("Mobile Number")}
                  required={true}
                  validate={[
                    required({ message: t("Mobile Number is required.") }),
                    format({
                      with: /^(?=.*[0-9])[- +()0-9]+$/,
                      message: t("Mobile number should be 10 digits"),
                    }),
                    length({
                      is: 14,
                      message: t("Mobile number should be 10 digits"),
                    }),
                  ]}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Field
                  name="gender"
                  required={true}
                  label={t("Gender")}
                  options={genderList}
                  component={radioInput}
                  validate={[required({ message: t("Gender is required.") })]}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
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
                      message: t(
                        "Confirm Password doesn't match with Password."
                      ),
                    }),
                  ]}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Field
                  name="terms"
                  component={checkboxInput}
                  checkText={t("Accept Terms & Conditions")}
                  required={true}
                  validate={[
                    acceptance({
                      message: t("Terms & Conditions are required."),
                    }),
                  ]}
                />
              </Grid>
              <Grid item container sm={12} xs={12} justifyContent="flex-end">
                <Stack spacing={2} direction="row">
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    {t("Reset")}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={pristine || submitting}
                    color="primary"
                    size="medium"
                  >
                    {submitting ? (
                      <CircularProgress size={25} />
                    ) : (
                      t("Register")
                    )}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
const mapStateToProps = (state: any, props: any) => {
  return {
    initialValues: {
      countrycode: "+91",
    },
  };
};

export default withTranslation("translations")(
  connect(mapStateToProps)(
    reduxForm({
      form: "registration",
      onSubmitFail: (errors) => {
        scrollToFirstError(errors);
      },
    })(Registration)
  )
);
