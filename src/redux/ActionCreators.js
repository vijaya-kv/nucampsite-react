import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => dispatch => {
    dispatch (commentsLoading());
    
    return fetch(baseUrl + 'comments')
    .then (response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error (`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;  
            }
        }, 
        error => {
            const errMsg = new Error (error.message);
            throw errMsg;
        }
    )
    .then(response => response.json())
    .then( comments => dispatch(addComments(comments)))
    .catch (error => dispatch (commentsFailed(error.message)));
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

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})


export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
            method : "POST",
            body : JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            }

    }) 
    .then(response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error (`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;  
            }
        }, 
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        console.log('post comment: '+error.messsage);
        alert ('Your comment could not be posted\nError: ' + error.message);
    });
};

export const fetchCampsites = () => dispatch => {
    dispatch (campsitesLoading());
    
    return fetch(baseUrl + 'campsites')
    .then (response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error (`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;  
            }
        }, 
        error => {
            const errMsg = new Error (error.message);
            throw errMsg;
        }
    )
    .then(response => response.json())
    .then( campsites => dispatch(addCampsites(campsites)))
    .catch(error => dispatch (campsitesFailed(error.message)));
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
    .then(response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error (`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;  
            }
        }, 
        error => {
            const errMsg = new Error (error.message);
            throw errMsg;
        }
    )
    .then(response => response.json())
    .then(promotions => dispatch(addPromotions(promotions)))
    .catch (error => dispatch (promotionsFailed(error.message)));
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

export const fetchPartners = () => dispatch => {
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error (`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMsg = new Error(error.message);
            throw errMsg;
        }
    )
    .then(response => response.json())
    .then(partners => dispatch(addPartners(partners)))
    .catch(error => dispatch (partnersFailed(error.message)))
}

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMsg => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMsg
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});


export const postFeedback = (firstName, lastName, phoneNum, email, agree, contactType, feedback) => () => {
    const newFeedback = {
        firstName: firstName,
        lastName: lastName,
        phoneNum: phoneNum,
        email: email,
        agree: agree,
        contactType: contactType,
        feedback: feedback
    };

    return fetch(baseUrl + 'feedback', {
        method : "POST",
        body : JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        }

    }) 
    .then(response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error (`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;  
            }
        }, 
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => {
        alert ('Thank you for your feedback!\n' +JSON.stringify(response));
    })
    .catch(error => {
        console.log('post feedback: '+error.messsage);
        alert ('Your feedback could not be posted\nError: ' + error.message);
    });
}