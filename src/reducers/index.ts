import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from "redux-form";
import { internationalizationDetailsReducer } from './internationalizationReducer';
import { columnsDetailsReducer } from './columnsReducer';
import { userDetailsReducer } from './userReducer';
import { profileDetailsReducer } from './profileDetailsReducer';


export const createRootReducer = (history: any) => combineReducers({
    routing: connectRouter(history),
    form: formReducer,
    internationalizationDetails: internationalizationDetailsReducer,
    columnsDetails: columnsDetailsReducer,
    userDetails: userDetailsReducer,
    profileDetails: profileDetailsReducer

}) 