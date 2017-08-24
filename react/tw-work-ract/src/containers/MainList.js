import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable, { List } from 'immutable';
import $ from 'jquery';
import { denyAgent, addResource, deleteResource } from '../actions';

import AgentItem from '../components/AgentItem';

class MainList extends Component {
    constructor(props) {
        super(props);
        this.onDenyClick = this.onDenyClick.bind(this);
        this.onResourceAdd = this.onResourceAdd.bind(this);
        this.onResourceDelete = this.onResourceDelete.bind(this);
    }

    onDenyClick(agentIndex) {
        let { dispatch } = this.props;
        $.getJSON('/deny?aid=' + agentIndex, function(json) {
            if(json.success) {
                dispatch(denyAgent(agentIndex));
            } else {
                alert(json.error);
            }
        });
    }

    onResourceAdd(agentIndex, resourceArr) {
        let { dispatch } = this.props;
        $.post('/resource/add', {
            aid: agentIndex,
            rs: resourceArr
        }, function(json) {
            if(json.data) {
                dispatch(addResource(agentIndex, json.data));
            } else {
                alert(json.error);
            }
        }, "json");
    }

    onResourceDelete(agentIndex, resourceIndex) {
        let { dispatch } = this.props;
        $.getJSON('/resource/del', {
            aid: agentIndex,
            rsid: resourceIndex
        }, function(json) {
            if(json.success) {
                dispatch(deleteResource(agentIndex, resourceIndex));
            } else {
                alert(json.error);
            }
        }, 'json');
    }

    shouldComponentUpdate(nextProp, nextState) {
        return !Immutable.is(nextProp.agents, this.props.agents);
    }

    render() {
        let {
            agents,
            onDenyClick,
            onResourceAdd,
            onResourceDelete
        } = this.props;

        return (
            <ul className="main-list">
                {agents.map((agent, index) => (
                    <AgentItem
                        agent={agent}
                        index={index}
                        key={'agent-' + index}
                        onDenyClick={this.onDenyClick}
                        onResourceAdd={this.onResourceAdd}
                        onResourceDelete={this.onResourceDelete}
                    />
                ))}
            </ul>
        );
    }
}

MainList.propTypes = {
    agents: PropTypes.instanceOf(Immutable.List).isRequired
};

export default connect()(MainList);