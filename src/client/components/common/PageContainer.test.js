import React from 'react';
import renderer from 'react-test-renderer';
import PageContainer from './PageContainer';

describe('PageContainer Component tests', () => {
    it('PageContainer match snapshot', () => {
        const component = renderer.create(<PageContainer />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });
});
