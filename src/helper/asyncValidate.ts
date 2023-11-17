import { useNavigate } from "react-router-dom";
import { check_duplicate_email } from './../actions/common/user';
const sleep = (ms:any) => new Promise(resolve => setTimeout(resolve, ms));
const asyncValidate = (values: any,dispatch:any , props:any) => {
	const { t } = props;
	if(values.email){
		return check_duplicate_email(values, props)
	      .then(data => {
	      	if(data.status===200){
	      		throw { email: t("Email Address Already Exists.") }	
	      	}
	    })
	  }else{
	  	return sleep(1000).then(() => {
		    
		 })
	  }
	
}

export default asyncValidate