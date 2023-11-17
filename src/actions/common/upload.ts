import axios from 'axios';
import { NavigateFunction } from "react-router-dom";
import { frontendFileHeader} from "../environment/header-configure";
import { handleHTTPError } from "../../helper/errorHandler";
import { ApiUrls } from "../../api-urls";


export function imageUpload(formValues:any, navigate: NavigateFunction) {
   
    const Url = ApiUrls.IMAGEUPLOAD;

    var params = new URLSearchParams();

    params.append('image', (typeof formValues.image !== "undefined" && formValues.image)?formValues.image:"");
    return axios.post(Url, formValues, frontendFileHeader()).then(function (response) {
        return response;
    }).catch(error => { 
        handleHTTPError(error, navigate);
        return error.response.data;  
    })
    
}
