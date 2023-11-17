import axios from 'axios';
import { NavigateFunction } from "react-router-dom";
import { Ucfirst, dbMobileFormat } from "../../helper/commonFunctions";
import { commonHeader, frontendHeader} from "./../environment/header-configure";
import { handleHTTPError } from "./../../helper/errorHandler";
import { ApiUrls } from "./../../api-urls";

export const USER_PROFILE_FETCH_SUCCESS = 'frontend:userfetchsuccess';
export const USER_PROFILE_FETCH_ERROR = 'frontend:userfetcherror';

const CancelToken = axios.CancelToken;
var cancel: any;
export function getUsers(UrlParams: string, navigate: NavigateFunction, token: any) {
    if (cancel !== undefined) {
        cancel();
    }

    const configtoken = {
        headers: { contentType: "application/json", Authorization: "Token " + token },
        cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
        })
    }
    return axios.get(UrlParams, configtoken).then(function (response) {
        return response;
    }).catch(error => {
        let response = {};
        if (error.message !== undefined) {
            handleHTTPError(error, navigate);
            response = error.response?.data;
        }
        return response;
    })
}

export function check_duplicate_email(formValues:any, navigate: NavigateFunction) {
   
    const Url = ApiUrls.DUPLICATEEMAIL;

    var params = new URLSearchParams();
    params.append('email', (typeof formValues.email !== "undefined" && formValues.email)?formValues.email.toLowerCase():"");
    return axios.post(Url, params, commonHeader()).then(function (response) {
        return response;
    }).catch(error => { 
        return error.response.data;  
    })
    
}

export function updateProfilePicture(formValues:any, navigate: NavigateFunction) {
   
    const Url = ApiUrls.UPDATEPROFILEIMAGE;

    var params = new URLSearchParams();

    params.append('url', (typeof formValues.url !== "undefined" && formValues.url)?formValues.url:"");
    return axios.post(Url, params, frontendHeader()).then(function (response) {
        return response;
    }).catch(error => { 
        handleHTTPError(error, navigate);
        return error.response.data;  
    })
    
}

export function userDetails(dispatch:any, navigate: NavigateFunction) {
   
    const Url = ApiUrls.USERPROFILEDETAILS;

    return axios.get(Url, frontendHeader()).then(function (response) {
        return response;
    }).catch(error => { 
        handleHTTPError(error, navigate);
        return error.response.data;  
    })
    
}

export function userProfileDetails(dispatch:any, navigate: NavigateFunction) {
   
    const Url = ApiUrls.USERPROFILEDETAILS;

    return axios.get(Url, frontendHeader()).then(function (response) {
        if (response.status === 200) {
            dispatch({
                type: USER_PROFILE_FETCH_SUCCESS,
                payload: {
                    user: response.data
                }
            })
        } else {
            dispatch({
                type: USER_PROFILE_FETCH_ERROR,
                payload: {
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

export function updateProfile(formValues: any, navigate: NavigateFunction) {

    const updateUrl = ApiUrls.UPDATEPROFILE;
    var params = new URLSearchParams();
    params.append('first_name', (typeof formValues.first_name !== "undefined" && formValues.first_name) ? Ucfirst(formValues.first_name) : "");
    params.append('last_name', (typeof formValues.last_name !== "undefined" && formValues.last_name) ? Ucfirst(formValues.last_name) : "");
    params.append('email', (typeof formValues.email !== "undefined" && formValues.email) ? formValues.email.toLowerCase() : "");
    params.append('countrycode', (typeof formValues.countrycode !== "undefined" && formValues.countrycode) ? formValues.countrycode : "");
    params.append('mobile', (typeof formValues.mobile !== "undefined" && formValues.mobile) ? dbMobileFormat(formValues.mobile) : "");
    params.append('gender', (typeof formValues.gender !== "undefined" && formValues.gender) ? formValues.gender : "");
    
        return axios.put(updateUrl, params, frontendHeader()).then(function (response) {
            return response;
        }).catch(function (error) {
            handleHTTPError(error, navigate);
            return error.response.data;
        });
   
}


