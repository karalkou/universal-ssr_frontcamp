import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
const store = configureMockStore()({});
import AddArticleForm from './AddArticleForm';

describe('AddArticleForm Component tests', () => {
    it('AddArticleForm match snapshot', () => {
        const component = renderer.create(
            <Provider store={store}>
                <AddArticleForm />
            </Provider>
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });
});
