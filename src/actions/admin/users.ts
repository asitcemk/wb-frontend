import axios from 'axios';
import md5 from 'md5';
import { NavigateFunction } from "react-router-dom";
import { Ucfirst, dbMobileFormat } from "../../helper/commonFunctions";
import { adminHeader } from "./../environment/header-configure";
import { handleHTTPError } from "./../../helper/errorHandler";
import { ApiUrls } from "./../../api-urls";

export const USER_FETCH_SUCCESS = 'admin:userfetchsuccess';
export const USER_FETCH_ERROR = 'admin:userfetcherror';

export function fetchUser(Id: any, dispatch: any, navigate: NavigateFunction) {

    const Url = ApiUrls.USERDETAILS + Id;

    return axios.get(Url, adminHeader()).then(function (response) {
        if (response.status === 200) {
            dispatch({
                type: USER_FETCH_SUCCESS,
                payload: {
                    user: response.data
                }
            })
        } else {
            dispatch({
                type: USER_FETCH_ERROR,
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


export function saveUser(formValues: any, navigate: NavigateFunction) {

    const createUrl = ApiUrls.USERSCREATE;
    const updateUrl = ApiUrls.USERSUPDATE + formValues.Id;
    var params = new URLSearchParams();
    params.append('first_name', (typeof formValues.first_name !== "undefined" && formValues.first_name) ? Ucfirst(formValues.first_name) : "");
    params.append('last_name', (typeof formValues.last_name !== "undefined" && formValues.last_name) ? Ucfirst(formValues.last_name) : "");
    params.append('email', (typeof formValues.email !== "undefined" && formValues.email) ? formValues.email.toLowerCase() : "");
    params.append('countrycode', (typeof formValues.countrycode !== "undefined" && formValues.countrycode) ? formValues.countrycode : "");
    params.append('mobile', (typeof formValues.mobile !== "undefined" && formValues.mobile) ? dbMobileFormat(formValues.mobile) : "");
    params.append('password', (typeof formValues.password !== "undefined" && formValues.password) ? md5(formValues.password) : "");
    params.append('gender', (typeof formValues.gender !== "undefined" && formValues.gender) ? formValues.gender : "");
    params.append('user_type', (typeof formValues.user_type !== "undefined" && formValues.user_type) ? formValues.user_type : "2");
    
    if (formValues.Id) {
        return axios.put(updateUrl, params, adminHeader()).then(function (response) {
            return response;
        }).catch(function (error) {
            handleHTTPError(error, navigate);
            return error.response.data;
        });
    } else {
        return axios.post(createUrl, params, adminHeader()).then(function (response) {
            return response;
        }).catch(function (error) {
            handleHTTPError(error, navigate);
            return error.response.data;
        });
    }
}