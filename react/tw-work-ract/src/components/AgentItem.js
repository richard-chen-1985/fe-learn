import React, { Component, PropTypes } from 'react';
import Immutable, { Map } from 'immutable';

import DialogAddNew from './DialogAddNew';

export default class AgentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        };

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    openDialog() {
        this.setState({
            showDialog: true
        });
    }

    closeDialog() {
        this.setState({
            showDialog: false
        });
    }

    onDeleteClick(agentIndex, resourceIndex) {
        this.props.onResourceDelete(agentIndex, resourceIndex);
    }

    onSubmit(resourceArr) {
        this.closeDialog();
        this.props.onResourceAdd(this.props.index, resourceArr);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(Immutable.is(nextProps.agent, this.props.agent) && nextState === this.state) {
            return false;
        }
        return true;
    }
    
    render() {
        let {
            agent,
            index
        } = this.props;

        let avatar = (agent) => (
            <div className="avatar">
                <a href={agent.get('avatarUrl')}><img src={agent.get('avatarImg')} alt=""/></a>
            </div>
        );

        let ctHeader = (agent) => (
            <div className="ct-header">
                <h3>{agent.get('title')}</h3>
                <div className="info">
                    <span>{agent.get('status')}</span>
                    <span>{agent.get('ip')}</span>
                    <span>{agent.get('dir')}</span>
                </div>
            </div>
        );

        let resources = (agent) => (
            <dl className="resources">
                <dt className="rs-title">Resources: </dt>
                <dd className="rs-list">
                    {agent.get('resources').map((resource, rsIndex) => (
                        <span className="rs-item" key={'rs-item-' + rsIndex}>
                            {resource}
                            <i className="btn-delete"
                                onClick={e => this.onDeleteClick(index, rsIndex)}
                            >×</i>
                        </span>
                    ))}
                </dd>
            </dl>
        )

        let dialog = (
            <DialogAddNew
                onClose={this.closeDialog}
                onSubmit={this.onSubmit} />
        );

        return (
            <li className={'item' + (agent.get('denied') ? ' denied': '')}>
                {avatar(agent)}
                <div className="content">
                    {ctHeader(agent)}
                    <div className="ct-resources-wrap clearfix">
                        <div className="btns">
                            ＋<a href="javascript:void(0)" className="btn-add"
                                onClick={this.openDialog}    
                            >Specify Resources</a>
                        </div>
                        {resources(agent)}
                    </div>
                    <div className="ct-operation">
                        <a href="javascript:void(0)" className="btn-deny"
                            onClick={ e => this.props.onDenyClick(index) }
                        >Deny</a>
                    </div>
                </div>
                {this.state.showDialog ? dialog : ''}
            </li>
        );
    }
}

AgentItem.propTypes = {
    agent: PropTypes.instanceOf(Immutable.Map).isRequired,
    index: PropTypes.number.isRequired,
    onDenyClick: PropTypes.func.isRequired,
    onResourceAdd: PropTypes.func.isRequired,
    onResourceDelete: PropTypes.func.isRequired
};