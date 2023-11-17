import { AlertColor } from "@mui/material/Alert";
import { useEffect } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { required } from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { textAreaInput } from "./../../../helper/input/textarea-input";
import { scrollToFirstError } from "../../../helper/commonFunctions";
import {
  fetchInternationalization,
  updateInternationalization,
} from "../../../actions/admin/internationalization";

function InternationalizationUpdate(props: any) {
  const { t } = useTranslation();
  const { handleSubmit, pristine, submitting } = props;
  const { internationalizationId } = useParams();
  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInternationalization(
      internationalizationId,
      props.dispatch,
      navigate
    ).then((res) => {});
  }, []);

  const cancel = () => {
    navigate("/admin/internationalization");
  };
  const copy = () => {
    const textField = document.createElement("textarea");
    textField.innerText = props.internationalization
      ? props.internationalization.english
      : "";
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const submit = (values: any) => {
    return updateInternationalization(
      values,
      navigate,
      internationalizationId
    ).then((res) => {
      if (res.status === 200) {
        showMessage("success", res.data.message)
        navigate("/admin/internationalization");
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  return (
    <Container maxWidth="xl">
      <h1>Update Internationalization</h1>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Field
              name="english"
              component={textAreaInput}
              type="text"
              rows={1}
              label={t("English Language")}
              required={true}
              disabled={true}
              validate={[
                required({ message: t("English Language are required.") }),
              ]}
            />
            <FormControlLabel
              control={<FileCopyIcon />}
              onClick={copy}
              label={t("Copy English Text")}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Field
              name="bengali"
              component={textAreaInput}
              type="text"
              rows={1}
              label={t("Bengali Language")}
              required={true}
              validate={[
                required({ message: t("Bengali Language are required.") }),
              ]}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Field
              name="hindi"
              component={textAreaInput}
              type="text"
              rows={1}
              label={t("Hindi Language")}
              required={true}
              validate={[
                required({ message: t("Hindi Language are required.") }),
              ]}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                disabled={pristine || submitting}
              >
                {submitting ? <CircularProgress size={25} /> : t("Update")}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                onClick={cancel}
              >
                {t("Cancel")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
const mapStateToProps = (state: any, props: any) => {
  let initialData = {};
  if (
    state.internationalizationDetails &&
    state.internationalizationDetails.internationalization
  ) {
    initialData = state.internationalizationDetails.internationalization;
  }
  return {
    initialValues: initialData,
    internationalization: state.internationalizationDetails
      ? state.internationalizationDetails.internationalization
      : null,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "internationalization-update",
    onSubmitFail: (errors) => {
      scrollToFirstError(errors);
    },
    enableReinitialize: true,
  })(InternationalizationUpdate)
);
