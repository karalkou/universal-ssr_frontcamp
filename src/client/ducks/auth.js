import { Record } from 'immutable';
import { createSelector } from 'reselect';
import { call, apply, put, all, take } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { appName } from '../config';

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
    authenticated: false,
    error: null,
});

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch (type) {
        case SIGN_UP_START:
            return state.set('loading', true);

        case SIGN_IN_SUCCESS:
            return state
                .set('user', payload.email)
                .set('loading', false)
                .set('authenticated', true);

        default:
            return state;
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
        payload: { email, password },
    };
}

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: { email, password },
    };
}

/**
 * Sagas
 */
export function* signInSaga() {
    console.log('*** signIn saga');

    while (true) {
        const action = yield take(SIGN_IN_REQUEST);

        try {
            console.log('*** before call /api/login');
            const headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            });

            const myInit = {
                method: 'POST',
                mode: 'cors',
                cache: 'default',
                headers,
                body: `username=${action.payload.email}&password=${action.payload.password}`,
            };
            const response = yield call(fetch, '/api/login', myInit);
            const data = yield apply(response, response.json);

            if (data.success) {
                yield put({
                    type: SIGN_IN_SUCCESS,
                    payload: { email: action.payload.email },
                });
            } else {
                yield put({
                    type: SIGN_OUT_SUCCESS,
                    payload: { email: action.payload.email },
                });
                // yield put(replace('/auth/signin'))
            }
        } catch (error) {
            yield put({
                type: SIGN_IN_ERROR,
                payload: { error },
            });
        }
    }
};

export function* signUpSaga() {
    console.log('*** signUp saga');

    while (true) {
        const action = yield take(SIGN_UP_START);

        try {
            console.log('*** before call /api/register');
            const headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            });

            const myInit = {
                method: 'POST',
                mode: 'cors',
                cache: 'default',
                headers,
                body: `username=${action.payload.email}&password=${action.payload.password}`,
            };
            const response = yield call(fetch, '/api/register', myInit);
            const data = yield apply(response, response.json);
            console.log('data: ', data);
            /* if (data.success) {
                yield put({
                    type: SIGN_IN_SUCCESS,
                    payload: { email: action.payload.email },
                });
            } else {
                yield put({
                    type: SIGN_OUT_SUCCESS,
                    payload: { email: action.payload.email },
                });
                // yield put(replace('/auth/signin'))
            } */
        } catch (error) {
            yield put({
                type: SIGN_UP_ERROR,
                payload: { error },
            });
        }
    }
}

// function* loginSaga(apiURL){}

export function* saga() {
    yield all([
        signInSaga(),
        signUpSaga(),
    ]);
}
