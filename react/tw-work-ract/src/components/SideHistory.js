import React, { Component, PropTypes } from 'react';
import Immutable, { Map, List } from 'immutable';
import $ from 'jquery';

export default class SideHistory extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(nextProps.history, this.props.history);
    }

    render() {
        let histories = this.props.history;
        
        return (
            <div className="side-list side-history">
                <header className="header">History</header>
                <ul className="list">
                    {histories.map((his, index) => (
                        <li className="item" key={'history-' + index}>
                            <a href={'/history/' + his.get('id')}>
                                {his.get('title')}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

SideHistory.propTypes = {
    history: PropTypes.instanceOf(Immutable.List).isRequired
}