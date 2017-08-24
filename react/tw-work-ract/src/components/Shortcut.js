import React, { Component, PropTypes } from 'react';
import Immutable, { Map, List } from 'immutable';

export default class Shortcut extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProp) {
        return !Immutable.is(nextProp.userInfo, this.props.userInfo) || nextProp.signOutUrl !== this.props.signOutUrl;
    }

    render() {
        let userInfo = this.props.userInfo;
        let userId = userInfo.get('userId');
        let userName = userInfo.get('userName');
        let signOutUrl = this.props.signOutUrl;

        if(userId) {
            return (
                <div className="shortcut">
                    Signed in as <a href={'/user/' + userId} className="username">{userName}</a>
                    <a href={signOutUrl} className="sign-out">Sign out</a>
                </div>
            );
        }
            
        return (
            <div className="shortcut">
                <a href="/login">Sign in</a>
            </div>
        );
    }
}

Shortcut.propTypes = {
    userInfo: PropTypes.instanceOf(Immutable.Map).isRequired
};