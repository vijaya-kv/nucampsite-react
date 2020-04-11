import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => dispatch => {
    dispatch (commentsLoading());
    
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then( comments => dispatch(addComments(comments)));
  };

export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
});

export const commentsFailed = errMsg => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload : errMsg
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENT,
    payload : comments

});

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload : {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }

});

export const fetchCampsites = () => dispatch => {
    dispatch (campsitesLoading());
    
    return fetch(baseUrl + 'campsites')
    .then(response => response.json())
    .then( campsites => dispatch(addCampsites(campsites)));
  };

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMsg => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload : errMsg
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload : campsites
});

export const fetchPromotions = () => dispatch => {
    dispatch (promotionsLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promotions => dispatch(addPromotions(promotions)));
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMsg => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMsg
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});