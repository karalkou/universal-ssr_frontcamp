import {all} from 'redux-saga/effects'
import {saga as articlesSaga} from '../ducks/articles';


export default function * () {
    yield all([
        articlesSaga(),
    ])
}