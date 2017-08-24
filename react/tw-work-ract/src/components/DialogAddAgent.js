import React, { Component, PropTypes } from 'react';

export default class DialogAddAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ip: ''
        };
        this.onNameChange = this.onNameChange.bind(this); 
        this.onIpChange = this.onIpChange.bind(this); 
        this.onKeyUp = this.onKeyUp.bind(this); 
        this.onSubmitClick = this.onSubmitClick.bind(this); 
        this.onCloseClick = this.onCloseClick.bind(this); 
    }

    componentDidMount() {
        this.refs.inputName.focus();
    }

    onNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    onIpChange(e) {
        this.setState({
            ip: e.target.value
        });
    }

    onKeyUp(e) {
        // 回车直接触发add按钮的click事件
        if(13 === e.keyCode) {
            this.onSubmitClick();
            return;
        }
    }

    onSubmitClick() {
        let name = this.state.name.trim();
        let ip = this.state.ip.trim();
        if('' === name) {
            alert('Ops, forget the resources name ?');
            this.refs.inputName.focus();
            return;
        }
        if(!/^\d{1,3}\.\d{1,3}\.\d{1,3}.\d{1,3}$/.test(ip)) {
            alert('Please input a valid IP address!');
            this.refs.inputIp.focus();
            return;
        }
        this.props.onSubmit(name, ip);
    }

    onCloseClick() {
        this.setState({
            name: '',
            ip: ''
        });
        this.props.onClose();
    }

    render() {
        return (
            <div className="dialog-addnew">
                <section className="cont">
                    <div className="form-ctrl">
                        <dl>
                            <dt>Name</dt>
                            <dd>
                                <input type="text" className="txt" name="name"
                                    ref="inputName"
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                />
                            </dd>
                        </dl>
                        <dl>
                            <dt>IP</dt>
                            <dd>
                                <input type="text" className="txt" name="ip"
                                    ref="inputIp"
                                    value={this.state.ip}
                                    onChange={this.onIpChange}
                                    onKeyUp={this.onKeyUp}
                                />
                            </dd>
                        </dl>
                    </div>
                    <p>
                        <a href="javascript:void(0)" className="btn-submit"
                            onClick={this.onSubmitClick}>Add agent</a>
                        <a href="javascript:void(0)" className="btn-close"
                            onClick={this.onCloseClick}>Close</a>
                    </p>
                </section>
                <div className="arrow"></div>
            </div>
        );
    }
}

DialogAddAgent.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};