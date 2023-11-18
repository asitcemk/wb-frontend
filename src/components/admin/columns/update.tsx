import { AlertColor } from "@mui/material/Alert";
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { required} from "redux-form-validators";
import { useTranslation } from "react-i18next";
import {  useParams } from 'react-router-dom';
import { useNavigate, useOutletContext } from "react-router-dom";
import {textAreaInput} from './../../../helper/input/textarea-input';
import {scrollToFirstError} from "../../../helper/commonFunctions";
import { fetchColumns } from '../../../actions/admin/columns';
import {textInput} from '../../../helper/input/text-input'
import { saveColumns } from './../../../actions/admin/columns';



function ColumnsUpdate(props:any) {
  const { t } = useTranslation();
  const {handleSubmit, pristine, submitting } = props;
  const [loading, setLoading] = useState(true);
  const { Id } = useParams();
  const navigate = useNavigate();
  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();

  useEffect(() => {
   fetchColumns(Id, props.dispatch, navigate).then(res => {
    if(res.data.status===200){
      setLoading(false);
    }
   })
  },[]);


  const cancel = () => {
    navigate("/admin/columns"); 
  };

  const submit = (values:any) => {
    values.Id=Id
    return saveColumns(values, navigate)
      .then(res => {        
        if(res.status===200){
          showMessage("success", res.data.message);
          navigate("/admin/columns");
        }else{
          throw new SubmissionError(res.errors);
        }
    });
  }; 

 
  return (
    <Container maxWidth="xl">
    <h1>{t("Update Columns")}</h1>
     <form onSubmit={handleSubmit(submit)}>
       <Grid container >
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
               validate={[required({ message: t("JSON Columns are required.") })]}
           />
         </Grid>
         <Grid item sm={12} xs={12}>
         <Stack direction="row" spacing={2}>
           <Button type="submit" variant="contained" color="primary" size="medium" disabled={pristine || submitting}>
             {submitting?<CircularProgress size={25}/>:t("Update")}
           </Button>
           <Button variant="outlined" color="secondary" size="medium" onClick={cancel}>
             {t("Cancel")}
           </Button>
           </Stack>
         </Grid>
       </Grid>
     </form>
   </Container>
        )

}
const mapStateToProps = (state:any, props:any) => {
  let initialData={};
  console.log(state)
  if(state.columnsDetails && state.columnsDetails.columns){
    initialData=state.columnsDetails.columns;
  }
    return {
      initialValues: initialData,
    }
}

export default connect(mapStateToProps)(reduxForm({ form: "columns-update",onSubmitFail: (errors) => {scrollToFirstError(errors);}, enableReinitialize : true})(ColumnsUpdate));