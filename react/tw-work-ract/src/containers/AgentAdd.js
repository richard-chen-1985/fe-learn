import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import $ from 'jquery';
import { addAgent } from '../actions';
import DialogAddAgent from '../components/DialogAddAgent';

const initialState = {
    showDialog: false
};

class AgentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
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

    onSubmit(name, ip) {
        let { dispatch } = this.props;
        this.closeDialog();
        $.post('/agents/add', {
            name: name,
            ip: ip
        }, function(json) {
            if(json.success === true) {
                dispatch(addAgent(json.data))
            } else {
                alert(json.error);
            }
        }, "json");
    }
    
    render() {
        let dialog = (
            <DialogAddAgent
                onClose={this.closeDialog}
                onSubmit={this.onSubmit} />
        );

        return (
            <div className="agent-add">
                <a href="javascript:void(0)" onClick={this.openDialog}
                >+ Add agent</a>
                {this.state.showDialog ? dialog : ''}
            </div>    
        );
    }
}

export default connect()(AgentAdd);