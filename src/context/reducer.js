import { SET_LOADING , SET_USER } from "./action.types";

export default (state,action) => {

    switch (action.type) {
        case SET_LOADING:
            return {...state , isLoading: action.payload};
        case SET_USER:
            return {...state , user: action.payload};
    
        default:
            return state;
    }
}