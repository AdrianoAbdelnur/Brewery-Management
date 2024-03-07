import { types } from "../types/types";


export const AuthReducer = (state= {} , action) => {
    switch (action.type) {
        case types.auth.login:
            return {
                ...state,
                user: action.payload.user,
                isLogged: true,
                token: action.payload.token,
                message: action.payload.message
            }
        case types.auth.logout:
            return {
                ...state,
                user: null,
                isLogged: false,
                token: "",
                message: action.payload.message
            }
    
        default:
            return state;
    }
}