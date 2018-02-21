import { appName } from '../config';
import { Map, Record } from 'immutable';
import { arrayToMap } from '../utils';
import { call, put, takeEvery } from 'redux-saga/effects';

/**
 * Constants
 * */
export const moduleName = 'filters';
const prefix = `${appName}/${moduleName}`;

export const FILTER_BY_AUTHOR_ALPHABET = `${prefix}/FILTER_BY_AUTHOR_ALPHABET`;

/**
 * Reducer
 * */

const defaultFilters = {
    byAuthorAlphabet: {
        isSorted: false,
        direction: -1
    }
};

export default function reducer(state = defaultFilters, action) {
    const { type, payload } = action;

    switch (type) {
        case FILTER_BY_AUTHOR_ALPHABET:
            return {
                ...state,
                byAuthorAlphabet: {
                    ...state.byAuthorAlphabet,
                    ...payload
                }
            };

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
    }
}

/**
 * Sagas
 **/