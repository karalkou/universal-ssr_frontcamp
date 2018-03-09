import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer, { moduleName as authModule } from '../ducks/auth';
import articlesReducer, { moduleName as articlesModule } from '../ducks/articles';
import filtersReducer, { moduleName as filtersModule } from '../ducks/filters';

export default combineReducers({
    form,
    [authModule]: authReducer,
    [articlesModule]: articlesReducer,
    [filtersModule]: filtersReducer,
});
