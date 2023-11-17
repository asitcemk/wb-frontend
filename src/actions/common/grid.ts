import axios from 'axios';
import { NavigateFunction } from "react-router-dom";
import { tokenPassHeader } from "../environment/header-configure";
import { handleHTTPError } from "../../helper/errorHandler";

const CancelToken = axios.CancelToken;
var cancel: any;
export function getData(UrlParams: string, navigate: NavigateFunction, token: any) {
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

export function statusChange(Url: any, formValues: any, navigate: NavigateFunction, token: any) {

    var params = new URLSearchParams();
    params.append('ids', (typeof formValues.ids !== "undefined" && formValues.ids) ? formValues.ids : "");
    params.append('status', (typeof formValues.status !== "undefined" && formValues.status) ? formValues.status : "");
    return axios.put(Url, params, tokenPassHeader(token)).then(function (response) {
        return response;
    }).catch(function (error) {
        handleHTTPError(error, navigate);
        return error.response.data;
    });
}

export function deleteData(Url: any, formValues: any, navigate: NavigateFunction, token: any) {

    var params = new URLSearchParams();
    params.append('ids', (typeof formValues.ids !== "undefined" && formValues.ids) ? formValues.ids : "");
    return axios.put(Url, params, tokenPassHeader(token)).then(function (response) {
        return response;
    }).catch(function (error) {
        handleHTTPError(error, navigate);
        return error.response.data;
    });
}