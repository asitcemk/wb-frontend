import { AlertColor } from "@mui/material/Alert";
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import { reduxForm, SubmissionError } from 'redux-form';
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {scrollToFirstError} from "../../../helper/commonFunctions";
import { fetchUser, saveUser } from './../../../actions/admin/users';
import Form from "./form";



function UpdateUser(props:any) {
  const { t } = useTranslation();
  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();
  const navigate = useNavigate();
  const { Id } = useParams();
  const [loading, setLoading] = useState(true);
  const {handleSubmit } = props;

  useEffect(() => {
    fetchUser(Id, props.dispatch, navigate).then(res => {
      if(res.data.status===200){
        setLoading(false);
      }
    })
  },[]);


  const submit = (values:any) => {
    values.Id=Id;
    return saveUser(values, navigate)
      .then(res => {        
        if(res.status===200){
            showMessage("success",res.data.message);
            navigate('/admin/users');
        }else{
          throw new SubmissionError(res.errors);
        }
    });
  };
  
 
  return (
          <Container maxWidth="xl">
           <h1>{t("Update User")}</h1>
            <form onSubmit={handleSubmit(submit)}>
              <Form 
                {...props}
                buttonText={t("Update")}
              />
            </form>
          </Container>
        )

}
const mapStateToProps = (state:any, props:any) => {
  let initialData={};
  if(state.userDetails && state.userDetails.user){
    initialData=state.userDetails.user;
  }
  return {
    initialValues: initialData,
  }
}

export default connect(mapStateToProps)(reduxForm({ form: "update-user",onSubmitFail: (errors) => {scrollToFirstError(errors);}, enableReinitialize : true})(UpdateUser));