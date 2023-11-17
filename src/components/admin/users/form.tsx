import { useState } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import { Field } from 'redux-form';
import {
  required,
  email,
  length,
  confirmation,
  format,
  acceptance,
} from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { textInput } from "./../../../helper/input/text-input";
import { dropdownInput } from "./../../../helper/input/dropdown-input";
import { passwordInput } from "./../../../helper/input/password-input";
import { checkboxInput } from "./../../../helper/input/checkbox-input";
import { emailInput } from "./../../../helper/input/email-input";
import { radioInput } from "./../../../helper/input/radio-input";
import { mobileInput } from "./../../../helper/input/mobile-input";


export default function Form(props:any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { submitting, pristine, buttonText } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [genderList] = useState([
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ]);
  const [codeOptions] = useState([
    {
      value: "+91",
      label: "+91",
      img: "/flags-small/in.png",
    },
  ]);

  const cancel = () => {
    navigate('/admin/users');  
  };

  const clickShowPassword = () => {
    setShowPassword(!showPassword);
  };
 
  return (
          <Grid container spacing={2}>
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
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="primary" size="medium" disabled={pristine || submitting} className="button">
                {submitting?<CircularProgress size={25}/>:t(buttonText)}
              </Button>
              <Button variant="outlined" color="secondary" size="medium" onClick={cancel} className="button">
                {t("Cancel")}
              </Button>
              </Stack>
            </Grid>
          </Grid>
        )
}

Form.propTypes = {
  buttonText:PropTypes.string.isRequired,
};
