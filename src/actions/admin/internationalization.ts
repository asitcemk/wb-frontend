import axios from 'axios';
import { NavigateFunction } from "react-router-dom";
import { adminHeader} from "../environment/header-configure";
import { handleHTTPError } from "../../helper/errorHandler";
import { ApiUrls } from "../../api-urls";

export const INTERNATIONALIZATION_FETCH_SUCCESS = 'admin:internationalizationfetchsuccess';
export const INTERNATIONALIZATION_FETCH_ERROR = 'admin:internationalizationfetcherror';

export function fetchInternationalization(internationalizationId:any, dispatch:any, navigate: NavigateFunction) {
   
    const Url = ApiUrls.INTERNATIONALIZATIONDETAILS+internationalizationId;

    return axios.get(Url, adminHeader()).then(function (response) {
        if(response.status === 200){
            dispatch({
                type: INTERNATIONALIZATION_FETCH_SUCCESS,
                payload:{
                    internationalization: response.data
                }
            })
        }else{
            dispatch({
                type: INTERNATIONALIZATION_FETCH_ERROR,
                payload:{
                    errors: response.data.errors
                }
            })
        }
        return response;
    }).catch(error => { 
            handleHTTPError(error, navigate);
            return error.response.data;  
        })
    
}

export function updateInternationalization(formValues:any, navigate: NavigateFunction, internationalizationId: string| undefined) {
   
    const Url = ApiUrls.INTERNATIONALIZATIONUPDATE+internationalizationId;

    var params = new URLSearchParams();
    params.append('english', (typeof formValues.english !== "undefined" && formValues.english)?formValues.english:"");
    params.append('bengali', (typeof formValues.bengali !== "undefined" && formValues.bengali)?formValues.bengali:"");
    params.append('hindi', (typeof formValues.hindi !== "undefined" && formValues.hindi)?formValues.hindi:"");
    return axios.put(Url, params, adminHeader()).then(function (response) {
        return response;
    }).catch(function (error){
        handleHTTPError(error, navigate);
        return error.response.data; 
    });
    
}