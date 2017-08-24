import React, { Component, PropTypes } from 'react';

export default class DialogAddNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    componentDidMount() {
        // 文本框事先获得焦点，可以直接输入
        this.refs.inputNames.focus()
    }

    onChange(e) {
        this.setState({
            value: e.target.value
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
        let names = this.state.value.trim();
        if('' === names) {
            alert('Ops, forget the resources name ?');
            this.refs.inputNames.focus();
            return;
        }
        // 可以用英文的逗号分开，一次增加多个
        let arr = names.split(',').map((item) => item.trim());
        this.props.onSubmit(arr);
    }

    render() {
        return (
            <div className="dialog-addnew">
                <header className="header">(separate multiple resources name with commas)</header>
                <section className="cont">
                    <p>
                        <input type="text" className="txt" name="names"
                            ref="inputNames"
                            value={this.state.value}
                            onChange={this.onChange}
                            onKeyUp={this.onKeyUp} />
                    </p>
                    <p>
                        <a href="javascript:void(0)" className="btn-submit"
                            onClick={this.onSubmitClick}>Add resources</a>
                        <a href="javascript:void(0)" className="btn-close"
                            onClick={this.props.onClose}>Close</a>
                    </p>
                </section>
                <div className="arrow"></div>
            </div>
        );
    }
}

DialogAddNew.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};