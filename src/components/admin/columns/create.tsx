import { AlertColor } from "@mui/material/Alert";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { required } from "redux-form-validators";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import { textInput } from "../../../helper/input/text-input";
import { textAreaInput } from "../../../helper/input/textarea-input";
import { scrollToFirstError } from "../../../helper/commonFunctions";
import { saveColumns } from "./../../../actions/admin/columns";

function CreateColumns(props: any) {
  const { t } = useTranslation();
  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();
  const navigate = useNavigate();
  const { handleSubmit, pristine, submitting } = props;

  const submit = (values: any): any => {
    return saveColumns(values, navigate).then((res) => {
      if (res.status === 201) {
        showMessage("success", res.data.message);
        navigate("/admin/columns");
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  const cancel = () => {
    navigate("/admin/columns");
  };

  return (
    <Container maxWidth="xl">
      <h1>{t("Create Columns")}</h1>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container>
          <Grid item sm={12} xs={12}>
            <Field
              name="list_name"
              component={textInput}
              type="text"
              label={t("List Name")}
              required={true}
              validate={[required({ message: t("List Name are required.") })]}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Field
              name="json_columns"
              component={textAreaInput}
              type="text"
              rows={5}
              label={t("JSON Columns")}
              required={true}
              validate={[
                required({ message: t("JSON Columns are required.") }),
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
              {submitting ? <CircularProgress size={25} /> : t("Create")}
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
  return {};
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "create-columns",
    onSubmitFail: (errors) => {
      scrollToFirstError(errors);
    },
  })(CreateColumns)
);
