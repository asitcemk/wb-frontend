import { USER_FETCH_SUCCESS, USER_FETCH_ERROR } from '../actions/admin/users';


export function userDetailsReducer(state = {}, { type, payload }: any) {
    switch (type) {
        case USER_FETCH_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                user: payload.user
            }
        case USER_FETCH_ERROR:
            return {
                ...state,
                fetching: false,
                fetched: true,
                user_error: payload.errors
            }
        default:
            return state;
    }
}
