import { appName } from '../config';
import { Record } from 'immutable';
import { createSelector } from 'reselect';
import { call, put, all, take } from 'redux-saga/effects';

/**
 * Constants
 * */
export const moduleName = 'auth';
const prefix = `${appName}/${moduleName}`;

export const SIGN_UP_START = `${prefix}/SIGN_UP_START`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;

export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    user: null,
    loading: false,
    error: null
});

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action;

    switch (type) {
        case SIGN_UP_START:
            return state.set('loading', true);

        case SIGN_IN_SUCCESS:
            return state
                .set('user', payload.user)
                .set('loading', false);

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];
export const userSelector = createSelector(stateSelector, state => state.user);

/**
 * Action Creators
 * */
export function signUp(email, password) {
    return {
        type: SIGN_UP_START,
        payload: {email, password}
    }
}

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: {email, password}
    }
}

/**
 * Sagas
 **/

export function* signUpSaga() {
}

export const signInSaga = function* () {
};

export function* saga() {
    yield all([
        signUpSaga(),
        signInSaga(),
    ])
}
