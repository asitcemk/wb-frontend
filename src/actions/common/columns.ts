import axios from 'axios';
import { NavigateFunction } from "react-router-dom";
import { tokenPassHeader } from "../environment/header-configure";
import { handleHTTPError } from "../../helper/errorHandler";
import { ApiUrls } from "../../api-urls";

export function fetchColumns(UrlParams: string, navigate: NavigateFunction, token: string) {
    return axios.get(UrlParams, tokenPassHeader(token)).then(function (response) {
        return response;
    }).catch(error => {
        handleHTTPError(error, navigate);
        return error.response?.data;
    })
}

export function saveColumns(formValues: any, navigate: NavigateFunction, token: string) {
    const Url = ApiUrls.COLUMNSSAVE + "/" + formValues.list_name;
    var params = new URLSearchParams();
    params.append('json_columns', (typeof formValues.json_columns !== "undefined" && formValues.json_columns) ? JSON.stringify(formValues.json_columns) : "");
    return axios.put(Url, params, tokenPassHeader(token)).then(function (response) {
        return response;
    }).catch(error => {
        handleHTTPError(error, navigate);
        return error.response?.data;
    })
}