import axios from 'axios';
import md5 from 'md5';
import { NavigateFunction } from "react-router-dom";
import { commonHeader, tokenPassHeader } from "../environment/header-configure";
import { handleHTTPError } from "../../helper/errorHandler";
import { ApiUrls } from "../../api-urls";
import { Ucfirst, dbMobileFormat } from "../../helper/commonFunctions";

export function signup(formValues: any, navigate: NavigateFunction) {

    const Url = ApiUrls.SIGNUP;

    var params = new URLSearchParams();
    params.append('first_name', (typeof formValues.first_name !== "undefined" && formValues.first_name) ? Ucfirst(formValues.first_name) : "");
    params.append('last_name', (typeof formValues.last_name !== "undefined" && formValues.last_name) ? Ucfirst(formValues.last_name) : "");
    params.append('email', (typeof formValues.email !== "undefined" && formValues.email) ? formValues.email.toLowerCase() : "");
    params.append('countrycode', (typeof formValues.countrycode !== "undefined" && formValues.countrycode) ? formValues.countrycode : "");
    params.append('mobile', (typeof formValues.mobile !== "undefined" && formValues.mobile) ? dbMobileFormat(formValues.mobile) : "");
    params.append('password', (typeof formValues.password !== "undefined" && formValues.password) ? md5(formValues.password) : "");
    params.append('gender', (typeof formValues.gender !== "undefined" && formValues.gender) ? formValues.gender : "");
    params.append('user_type', (typeof formValues.user_type !== "undefined" && formValues.user_type) ? formValues.user_type : "2");
    return axios.post(Url, params, commonHeader()).then(function (response) {
        return response;
    }).catch(error => {
        handleHTTPError(error, navigate);
        return error.response.data;
    })

}

export function login(Url: string, formValues: any, dispatch: any, navigate: NavigateFunction) {

    var params = new URLSearchParams();
    params.append('email', (typeof formValues.email !== "undefined" && formValues.email) ? formValues.email.toLowerCase() : "");
    params.append('password', (typeof formValues.password !== "undefined" && formValues.password) ? md5(formValues.password) : "");
    return axios.post(Url, params, commonHeader()).then(function (response) {
        return response;
    }).catch(error => {
        handleHTTPError(error, navigate);
        return error.response.data;
    })

}

export function forget_password_email(formValues: any, navigate: NavigateFunction) {

    const Url = ApiUrls.FORGOTPASSWORD;

    var params = new URLSearchParams();
    params.append('user_type', (typeof formValues.user_type !== "undefined" && formValues.user_type) ? formValues.user_type : "");
    params.append('email', (typeof formValues.email !== "undefined" && formValues.email) ? formValues.email.toLowerCase() : "");
    return axios.post(Url, params, commonHeader()).then(function (response) {
        return response;
    }).catch(error => {
        handleHTTPError(error, navigate);
        return error.response.data;
    })

}

export function verify_otp(formValues: any, navigate: NavigateFunction, token: string) {

    const Url = ApiUrls.VERIFYOTP;

    var params = new URLSearchParams();
    params.append('type', (typeof formValues.type !== "undefined" && formValues.type) ? formValues.type : "");
    params.append('otp', (typeof formValues.otp !== "undefined" && formValues.otp) ? formValues.otp : "");
    return axios.post(Url, params, tokenPassHeader(token)).then(function (response) {
        return response;
    }).catch(error => {
        handleHTTPError(error, navigate);
        return error.response.data;
    })

}

export function resetPassword(formValues: any, navigate: NavigateFunction, token: string) {

    const Url = ApiUrls.RESETPASSWORD;

    var params = new URLSearchParams();
    params.append('password', (typeof formValues.password !== "undefined" && formValues.password) ? md5(formValues.password) : "");
    return axios.post(Url, params, tokenPassHeader(token)).then(function (response) {
        return response;
    }).catch(error => {
        handleHTTPError(error, navigate);
        return error.response.data;
    })

}

export function resend_otp(navigate: NavigateFunction, token: string) {

    const Url = ApiUrls.RESENDOTP;

    var params = new URLSearchParams();

    return axios.post(Url, params, tokenPassHeader(token)).then(function (response) {
        return response;
    }).catch(error => {
        handleHTTPError(error, navigate);
        return error.response.data;
    })

}