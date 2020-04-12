import * as ActionTypes from './ActionTypes';

export const Partners = (state = {
    isLoading : true,
    errMsg: null,
    partners: []
    }, action) => {
    switch (action.type)  {
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading:false, errMsg: null, partners: action.payload};

        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading:true, errMsg: null, partners: []};

        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading:false, errMsg: action.payload};
                 
        default:
            return state;
    }
}