import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable, { Map, List } from 'immutable';
import $ from 'jquery';

import {
    initUserInfo,
    initAgents,
    initHistory
} from '../actions';

import Main from './Main';
import Shortcut from '../components/Shortcut';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

class App extends Component {
    
    componentDidMount() {
        const { dispatch } = this.props;
        $.getJSON('/userinfo', (json) => {
            if(json.userInfo) {
                dispatch(initUserInfo(json.userInfo));
            }
        });
        $.getJSON('/agents', (json) => {
            if(json.agents) {
                dispatch(initAgents(json.agents));
            }
        });
        $.getJSON('/history', (json) => {
            if(json.data) {
                dispatch(initHistory(json.data));
            }
        });
    }
    
    render() {
        const { userInfo, agents, history } = this.props;
        return (
            <div>
                <Shortcut userInfo={userInfo} signOutUrl="/signout" />
                <Nav />
                <Main agents={agents} history={history} />
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    userInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    agents: PropTypes.instanceOf(Immutable.List).isRequired,
    history: PropTypes.instanceOf(Immutable.List).isRequired
};

function mapStateToProps(state = Map()) {
    let [
        userInfo = Map(),
        agents = List(),
        history = List()
    ] = [state.get('userInfo'), state.get('agents'), state.get('history')];
    return {
        userInfo,
        agents,
        history
    };
}

export default connect(mapStateToProps)(App);