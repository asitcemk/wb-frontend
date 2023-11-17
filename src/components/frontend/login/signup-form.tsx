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
import { required, length, acceptance, format } from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { textInput } from "./../../../helper/input/text-input";
import { dropdownInput } from "./../../../helper/input/dropdown-input";
import { passwordInput } from "./../../../helper/input/password-input";
import { checkboxInput } from "./../../../helper/input/checkbox-input";
import { emailInput } from "./../../../helper/input/email-input";
import { radioInput } from "./../../../helper/input/radio-input";
import { mobileInput } from "./../../../helper/input/mobile-input";
import { signup } from "../../../actions/common/auth";

const SignupForm = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    pristine,
    submitting,
    showMessage,
    handleClose,
    handleLogin,
    setShowSignup,
    setShowOtp,
    setToken,
    setSentEmail,
    setType,
  } = props;
  const [codeoptions] = useState([
    {
      value: "+91",
      label: "+91",
      img: "/flags-small/in.png",
    },
  ]);
  const [genderList] = useState([
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ]);
  const [showPassword, setShowPassword] = useState(false);

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signupSubmit = (values: any) => {
    return signup(values, navigate).then((res) => {
      if (res.status === 201) {
        showMessage("success", res.data.message);
        setShowSignup(false);
        setShowOtp(true);
        setToken(res.data.result);
        setSentEmail(values.email);
        setType("active");
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(signupSubmit)}>
      <DialogTitle id="login-dialog-title">{t("Registration")}</DialogTitle>
      <DialogContent className="login-dialog-cont">
        <Grid container spacing={3}>
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
              ]}
            />
          </Grid>
          <Grid item sm={4} xs={5}>
            <Field
              name="countrycode"
              required={true}
              options={codeoptions}
              component={dropdownInput}
              label={t("Code")}
              novalue={t("select") + " " + t("code")}
              validate={[required({ message: t("Country code is required.") })]}
            />
          </Grid>
          <Grid item sm={8} xs={7}>
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
          <Grid
            item
            sm={12}
            xs={12}
            container
            justifyContent="flex-start"
            alignItems="center"
          >
            <Field
              name="terms"
              component={checkboxInput}
              checkText={t("Accept Terms & Conditions")}
              required={true}
              validate={[
                acceptance({ message: t("Terms & Conditions are required.") }),
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
                {submitting ? <CircularProgress size={25} /> : t("Register")}
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            sm={5}
            xs={5}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <p>{t("Have an account?")}</p>
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
            <Button color="primary" onClick={handleLogin}>
              {t("Login")}
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
  reduxForm({ form: "signup-form" })(SignupForm)
);
