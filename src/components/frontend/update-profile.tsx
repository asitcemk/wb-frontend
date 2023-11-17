import { AlertColor } from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { required, email, length, format } from "redux-form-validators";
import { useNavigate, useOutletContext } from "react-router-dom";
import { scrollToFirstError } from "../../helper/commonFunctions";
import { textInput } from "../../helper/input/text-input";
import { dropdownInput } from "../../helper/input/dropdown-input";
import { mobileInput } from "../../helper/input/mobile-input";
import { radioInput } from "./../..//helper/input/radio-input";
import  asyncValidate  from "./../..//helper/asyncValidate";
import { userProfileDetails, updateProfile } from "./../../actions/common/user";


function UpdateProfile(props: any) {
  const { t } = useTranslation();
  const { open, updateClose, handleSubmit, pristine, submitting } = props;
  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    userProfileDetails(props.dispatch, navigate).then((res) => {
      if (res.status === 200) {
        setLoading(false);
      }
    });
  }, []);

  const submit = (values: any) => {
    return updateProfile(values, navigate)
      .then(res => {        
        if(res.status===200){
            showMessage("success",res.data.message);
            updateClose();
        }else{
          throw new SubmissionError(res.errors);
        }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={updateClose}
      maxWidth="md"
      fullWidth={true}
      scroll="body"
    >
      <DialogTitle>{t("Update Profile")}</DialogTitle>
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field
                name="first_name"
                component={textInput}
                type="text"
                label={t("First Name")}
                required={true}
                validate={[
                  required({ message: t("The First name is required.") }),
                  length({
                    in: [4, 20],
                    message: t("Characters length must be between 4 to 20."),
                  }),
                  format({
                    with: /^[a-z]+$/i,
                    message: t("Only allows letters"),
                  }),
                ]}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="last_name"
                component={textInput}
                type="text"
                label={t("Last Name")}
                required={true}
                validate={[
                  required({ message: t("The last name is required.") }),
                  length({
                    in: [4, 20],
                    message: t("Characters length must be between 4 to 20."),
                  }),
                  format({
                    with: /^[a-z]+$/i,
                    message: t("Only allows letters"),
                  }),
                ]}
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                name="email"
                component={textInput}
                type="text"
                label={t("Email Address")}
                required={true}
                validate={[
                  required({ message: t("Email Address is required.") }),
                  email({ message: t("Please Enter a valid Email Address.") }),
                ]}
              />
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={4}>
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
            <Grid item xs={6}>
              <Field
                name="gender"
                required={true}
                label={t("Gender")}
                options={genderList}
                component={radioInput}
                validate={[required({ message: t("Gender is required.") })]}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={updateClose}
            size="small"
            variant="outlined"
            color="secondary"
          >
            {t("Cancel")}
          </Button>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
          >
            {t("Update")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state: any, props: any) => {
  let initialData = {};

  if (state.profileDetails && state.profileDetails.user) {
    initialData = state.profileDetails.user;
  }
  return {
    initialValues: initialData,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "update-profile",
    onSubmitFail: (errors) => {
      scrollToFirstError(errors);
    },
    enableReinitialize: true,
  })(UpdateProfile)
);
