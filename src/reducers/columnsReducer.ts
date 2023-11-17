import { COLUMNS_FETCH_SUCCESS, COLUMNS_FETCH_ERROR } from './../actions/admin/columns';


export function columnsDetailsReducer(state = {}, { type, payload }: any) {
    switch (type) {
        case COLUMNS_FETCH_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                columns: payload.columns
            }
        case COLUMNS_FETCH_ERROR:
            return {
                ...state,
                fetching: false,
                fetched: true,
                columns_error: payload.errors
            }
        default:
            return state;
    }
}
