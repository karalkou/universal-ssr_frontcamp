import { appName } from '../config';
import { Record } from 'immutable';
// import { call, put, takeEvery } from 'redux-saga/effects';

/**
 * Constants
 * */
export const moduleName = 'filters';
const prefix = `${appName}/${moduleName}`;

export const FILTER_BY_AUTHOR_ALPHABET = `${prefix}/FILTER_BY_AUTHOR_ALPHABET`;

/**
 * Reducer
 * */
const byAuthorAlphabetModel = Record({
    isSorted: false,
    direction: -1,
});

export const ReducerRecord = Record({
    byAuthorAlphabet: new byAuthorAlphabetModel(),
});

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch (type) {
        case FILTER_BY_AUTHOR_ALPHABET:
            return state
                .setIn(['byAuthorAlphabet'], new byAuthorAlphabetModel(payload));

        default:
            return state;
    }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */
export function filterByAuthorAlphabet(direction) {
    return {
        type: FILTER_BY_AUTHOR_ALPHABET,
        payload: direction,
    };
}

/**
 * Sagas
 * */
