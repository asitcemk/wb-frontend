import { USER_PROFILE_FETCH_SUCCESS, USER_PROFILE_FETCH_ERROR } from '../actions/common/user';


export function profileDetailsReducer(state = {}, { type, payload }: any) {
    switch (type) {
        case USER_PROFILE_FETCH_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                user: payload.user
            }
        case USER_PROFILE_FETCH_ERROR:
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
