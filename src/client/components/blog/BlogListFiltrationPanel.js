import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterByAuthorAlphabet } from '../../ducks/filters';

class BlogListFiltrationPanel extends Component {
    sortByAuthorAlphabet = () => {
        const { byAuthorAlphabetState: { direction } } = this.props;

        if ( direction === 1 ){
            this.props.filterByAuthorAlphabet({
                isSorted: true,
                direction: -1
            });
        } else if ( direction === -1 ) {
            this.props.filterByAuthorAlphabet({
                isSorted: true,
                direction: 1
            });
        }
    };

    sortReset = () => {
        this.props.filterByAuthorAlphabet({
            isSorted: false,
            direction: 1
        });
    };


    render() {
        const { byAuthorAlphabetState: { direction, isSorted } } = this.props;

        return (
            <div>
                <span>By author: </span>
                <span onClick={this.sortByAuthorAlphabet}>
                    {
                        isSorted
                            ? direction === 1
                                ? <span style={{color: 'blue'}}>z-a</span>
                                : <span style={{color: 'blue'}}>a-z</span>
                            : <span>a-z</span>
                    }
                </span>
                <button onClick={this.sortReset}>Reset</button>
            </div>
        );
    }
}

BlogListFiltrationPanel.propTypes = {};
BlogListFiltrationPanel.defaultProps = {};

export default connect(
    (state) => {
        return {
            byAuthorAlphabetState: state.filters.byAuthorAlphabet,
        };
    },
    { filterByAuthorAlphabet }
)(BlogListFiltrationPanel);
