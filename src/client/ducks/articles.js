// import { createSelector } from 'reselect';
import { call, apply, put, takeEvery, all } from 'redux-saga/effects';
// import { replace } from 'react-router-redux';
import { Map, Record } from 'immutable';
import fetch from 'isomorphic-fetch';
import { appName } from '../config';
import { arrayToMap, generateId } from '../utils';

/**
 * Constants
 * */
export const moduleName = 'articles';
const prefix = `${appName}/${moduleName}`;

export const LOAD_ALL_ARTICLES_REQUEST = `${prefix}/LOAD_ALL_ARTICLES_REQUEST`;
export const LOAD_ALL_ARTICLES_START = `${prefix}/LOAD_ALL_ARTICLES_START`;
export const LOAD_ALL_ARTICLES_SUCCESS = `${prefix}/LOAD_ALL_ARTICLES_SUCCESS`;
export const ADD_ARTICLE_REQUEST = `${prefix}/ADD_ARTICLE_REQUEST`;
export const ADD_ARTICLE = `${prefix}/ADD_ARTICLE`;
export const REMOVE_ARTICLE = `${prefix}/REMOVE_ARTICLE`;

/**
 * Reducer
 * */
const mockResponse = [
    {
        createdAt: '2018-02-03T04:41:45.586Z',
        updatedAt: '2018-02-03T04:41:45.586Z',
        id: '5a753d89aa7586161cef2403',
        title: "Zhabinsky's birthday note",
        author: 'Yury Karalkou',
        views: 1,
        body: "Zhabinsky's birthday was on 28.01.2018",
        __v: 0,
    },
    {
        createdAt: '2018-02-03T04:45:24.589Z',
        updatedAt: '2018-02-03T04:45:24.589Z',
        id: '5a753e64ea59510b0ca6271c',
        title: 'Documents (aka Objects)',
        author: 'MLab',
        views: 100500,
        body: 'From the "Documents" tab you can browse and search for objects in this collection. All standard query constructs are supported except for map/reduce queries. To use map/reduce, use the MongoDB shell (note that temporary result collections will be viewable in mLab). You can also add, edit, and delete individual documents from here. Bulk collection updates are not yet supported in this UI (although they are supported in the shell).',
        __v: 0,
    },
];

export const ArticleModel = Record({
    createdAt: null,
    updatedAt: null,
    id: null,
    title: null,
    author: null,
    views: null,
    body: null,
    __v: null,
});

export const ReducerRecord = Record({
    loading: false,
    loaded: false,
    entities: new Map({}),
});

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_ALL_ARTICLES_START:
            return state.set('loading', true);

        case LOAD_ALL_ARTICLES_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', arrayToMap(mockResponse, ArticleModel));

        case ADD_ARTICLE:
            return state
                .setIn(['entities', payload.id], new ArticleModel(payload));

        case REMOVE_ARTICLE:
            return state
                .deleteIn(['entities', payload.id]);

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
export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES_REQUEST,
    };
}

export function addArticle(formStateObj) {
    return {
        type: ADD_ARTICLE_REQUEST,
        payload: formStateObj,
    };
}

export function removeArticle(id) {
    return {
        type: REMOVE_ARTICLE,
        payload: { id },
    };
}

/**
 * Sagas
 * */
export function* fetchAllSaga() {
    yield put({
        type: LOAD_ALL_ARTICLES_START
    });

    const response = yield call(fetch, '/api/blogs');

    const data = yield apply(response, response.text);

    yield put({
        type: LOAD_ALL_ARTICLES_SUCCESS,
        payload: JSON.parse(data),
    });
}

export function* addArcticleSaga(action) {
    const id = yield call(generateId);

    const effect = put({
        type: ADD_ARTICLE,
        payload: { id, ...action.payload },
    });

    yield effect;
}

export function* saga() {
    yield all([
        takeEvery(LOAD_ALL_ARTICLES_REQUEST, fetchAllSaga),
        takeEvery(ADD_ARTICLE_REQUEST, addArcticleSaga)
    ]);
}
