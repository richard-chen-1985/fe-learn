import React, { Component, PropTypes } from 'react';
import Immutable, { Map, List } from 'immutable';

import AgentAdd from './AgentAdd';
import MainList from './MainList';
import MainHeader from '../components/MainHeader';
import SideSummary from '../components/SideSummary';
import SideHistory from '../components/SideHistory';

export default class Main extends Component {
    render() {
        return (
            <div className="main">
                <MainHeader />
                <section className="list-wrap">
                    <AgentAdd />
                    <MainList agents={this.props.agents} />
                </section>
                <aside className="sidebar">
                    <SideSummary agents={this.props.agents} />
                    <SideHistory history={this.props.history} />
                </aside>
            </div>
        );
    }
}

Main.propTypes = {
    agents: PropTypes.instanceOf(Immutable.List).isRequired,
    history: PropTypes.instanceOf(Immutable.List).isRequired
}