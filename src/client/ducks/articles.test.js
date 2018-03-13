import articlesReducer, {
    defaultState,
    LOAD_ALL_ARTICLES_SUCCESS,
    LOAD_ALL_ARTICLES_START,
    ADD_ARTICLE,
} from './articles';
import articlesResponseMock from '../mocks/articles';
import { mapToArr } from "../utils";

describe('articles reducer', () => {
    it('should return the initial state', () => {
        expect(articlesReducer(undefined, {})).toEqual(defaultState);
    });

    it('should handle LOAD_ALL_ARTICLES_START', () => {
        const action = {
            type: LOAD_ALL_ARTICLES_START,
        };

        expect(articlesReducer(defaultState, action).loading).toEqual(true);
    });

    it('should handle LOAD_ALL_ARTICLES_SUCCESS', () => {
        const action = {
            type: LOAD_ALL_ARTICLES_SUCCESS,
            payload: {
                data: articlesResponseMock
            },
        };

        expect(mapToArr(
            articlesReducer(defaultState, action)
                .entities
                .map((item) => item.toJS())
            )
        ).toEqual(articlesResponseMock);
    });

    it('should handle ADD_ARTICLE', () => {
        const data = {
            author: "yury@yury.ru",
            body: "Just article test body",
            createdAt: "2018-03-13T13:47:13.322Z",
            title: "Just test ADD_ARTICLE",
            updatedAt: "2018-03-13T13:47:13.323Z",
            __v: 0,
            _id: "5aa7d6618b1ec71cc0badaf4",
            views: null,
        };

        const action = {
            type: ADD_ARTICLE,
            payload: {
                ...data
            },
        };

        expect(articlesReducer(defaultState, action).entities.toJS()[data._id]).toEqual(data);
    });
});
