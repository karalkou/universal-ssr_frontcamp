import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import articlesReducer, {moduleName as articlesModule} from '../ducks/articles';
import filtersReducer, {moduleName as filtersModule} from '../ducks/filters';

export default combineReducers({
    router,
    [articlesModule]: articlesReducer,
    [filtersModule]: filtersReducer,
})