import axios from 'axios';
import { NavigateFunction } from "react-router-dom";
import { adminHeader } from "./../environment/header-configure";
import { handleHTTPError } from "./../../helper/errorHandler";
import { ApiUrls } from "./../../api-urls";

export const COLUMNS_FETCH_SUCCESS = 'admin:columnsfetchsuccess';
export const COLUMNS_FETCH_ERROR = 'admin:columnsfetcherror';



export function fetchColumns(Id: any, dispatch: any, navigate: NavigateFunction) {

    const Url = ApiUrls.COLUMNSDETAILS + Id;

    return axios.get(Url, adminHeader()).then(function (response) {
        if (response.status === 200) {
            dispatch({
                type: COLUMNS_FETCH_SUCCESS,
                payload: {
                    columns: response.data
                }
            })
        } else {
            dispatch({
                type: COLUMNS_FETCH_ERROR,
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

export function saveColumns(formValues: any, navigate: NavigateFunction) {

    const createUrl = ApiUrls.COLUMNSCREATE;
    const updateUrl = ApiUrls.COLUMNSUPDATE + formValues.Id;
    var params = new URLSearchParams();
    params.append('list_name', (typeof formValues.list_name !== "undefined" && formValues.list_name) ? formValues.list_name : "");
    params.append('json_columns', (typeof formValues.json_columns !== "undefined" && formValues.json_columns) ? formValues.json_columns : "");
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