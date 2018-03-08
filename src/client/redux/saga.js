import { all } from 'redux-saga/effects';
import { saga as articlesSaga } from '../ducks/articles';
import { saga as authSaga } from '../ducks/auth';


export default function* () {
    yield all([
        articlesSaga(),
        authSaga(),
    ]);
}
