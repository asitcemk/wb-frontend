import {
  INTERNATIONALIZATION_FETCH_SUCCESS,
  INTERNATIONALIZATION_FETCH_ERROR,
} from "../actions/admin/internationalization";


export function internationalizationDetailsReducer(state = {}, { type, payload }: any) {
  switch (type) {
      case INTERNATIONALIZATION_FETCH_SUCCESS:
          return {
              ...state,
              fetching: false,
              fetched: true,
              internationalization: payload.internationalization
          }
      case INTERNATIONALIZATION_FETCH_ERROR:
          return {
              ...state,
              fetching: false,
              fetched: true,
              internationalization_error: payload.errors
          }
      default:
          return state;
  }
}
