// import { createSelector } from 'reselect';
import { call, apply, put, select, takeEvery, all } from 'redux-saga/effects';
import { Map, Record } from 'immutable';
import fetch from 'isomorphic-fetch';
import { appName } from '../config';
import { arrayToMap } from '../utils';
import { userSelector } from './auth';

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

export const REMOVE_ARTICLE_REQUEST = `${prefix}/REMOVE_ARTICLE_REQUEST`;
export const REMOVE_ARTICLE_SUCCESS = `${prefix}/REMOVE_ARTICLE_SUCCESS`;

/**
 * Reducer
 * */
/* const mockResponse = [
    {
        createdAt: '2018-02-03T04:41:45.586Z',
        updatedAt: '2018-02-03T04:41:45.586Z',
        _id: '5a753d89aa7586161cef2403',
        title: "Zhabinsky's birthday note",
        author: 'Yury Karalkou',
        views: 1,
        body: "Zhabinsky's birthday was on 28.01.2018",
        __v: 0,
    },
    {
        createdAt: '2018-02-03T04:45:24.589Z',
        updatedAt: '2018-02-03T04:45:24.589Z',
        _id: '5a753e64ea59510b0ca6271c',
        title: 'Documents (aka Objects)',
        author: 'MLab',
        views: 100500,
        body: 'From the "Documents" tab you can browse and ' +
        'search for objects in this collection. All standard ' +
        'query constructs are supported except for map/reduce ' +
        'queries. To use map/reduce, use the MongoDB shell ' +
        '(note that temporary result collections will be ' +
        'viewable in mLab). You can also add, edit, and ' +
        'delete individual documents from here. Bulk collection ' +
        'updates are not yet supported in this UI (although ' +
        'they are supported in the shell).',
        __v: 0,
    },
]; */

export const ArticleModel = Record({
    createdAt: null,
    updatedAt: null,
    _id: null,
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
                .set('entities', arrayToMap(payload.data, ArticleModel));

        case ADD_ARTICLE:
            return state
                .setIn(['entities', payload._id], new ArticleModel(payload));

        case REMOVE_ARTICLE_SUCCESS:
            return state
                .deleteIn(['entities', payload._id]);

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
        type: REMOVE_ARTICLE_REQUEST,
        payload: { id },
    };
}

/**
 * Sagas
 * */
export function* fetchAllSaga() {
    yield put({
        type: LOAD_ALL_ARTICLES_START,
    });

    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
    });

    const myInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
        headers,
    };

    const response = yield call(fetch, '/api/blogs', myInit);

    const data = yield apply(response, response.json);

    console.log('********** data: ', data);

    yield put({
        type: LOAD_ALL_ARTICLES_SUCCESS,
        payload: { data },
    });
}

export function* addArcticleSaga(action) {
    const { title, body } = action.payload;
    const author = yield select(userSelector);

    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
    });

    const myInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
        headers,
        body: `title=${title}&author=${author}&body=${body}`,
    };

    const response = yield call(fetch, '/api/blogs', myInit);

    const data = yield apply(response, response.json);

    console.log('data after blog PUT: ', data);

    const effect = put({
        type: ADD_ARTICLE,
        payload: { ...data },
    });

    yield effect;
}

export function* removeArcticleSaga(action) {
    const { id } = action.payload;

    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
    });

    const myInit = {
        method: 'DELETE',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
        headers,
    };

    const response = yield call(fetch, `/api/${id}`, myInit);

    const data = yield apply(response, response.json);

    console.log('data after blog DELETE: ', data);

    const effect = put({
        type: REMOVE_ARTICLE_SUCCESS,
        payload: { ...action.payload },
    });

    yield effect;
}

export function* saga() {
    yield all([
        takeEvery(LOAD_ALL_ARTICLES_REQUEST, fetchAllSaga),
        takeEvery(ADD_ARTICLE_REQUEST, addArcticleSaga),
        takeEvery(REMOVE_ARTICLE_REQUEST, removeArcticleSaga),
    ]);
}
