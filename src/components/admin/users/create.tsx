import { AlertColor } from "@mui/material/Alert";
import { connect } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import Container from "@mui/material/Container";
import { reduxForm, SubmissionError } from "redux-form";
import { useTranslation } from "react-i18next";
import { scrollToFirstError } from "../../../helper/commonFunctions";
import Form from "./form";
import { saveUser } from "./../../../actions/admin/users";

function CreateUser(props: any) {
  const { t } = useTranslation();
  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();
  const navigate = useNavigate();
  const { handleSubmit } = props;

  const submit = (values: any) => {
    return saveUser(values, navigate).then((res) => {
      if (res.status === 201) {
        showMessage("success", res.data.message);
        navigate("/admin/users");
      } else {
        throw new SubmissionError(res.errors);
      }
    });
  };

  return (
    <Container maxWidth="xl">
      <h1>{t("Create User")}</h1>
      <form onSubmit={handleSubmit(submit)}>
        <Form {...props} buttonText={t("Create")} />
      </form>
    </Container>
  );
}
const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "create-user",
    onSubmitFail: (errors) => {
      scrollToFirstError(errors);
    },
  })(CreateUser)
);
