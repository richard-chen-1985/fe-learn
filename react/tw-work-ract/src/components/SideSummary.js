import React, { Component, PropTypes } from 'react';
import Immutable, { Map, List } from 'immutable';

export default class SideSummary extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let agents = this.props.agents;  
        let idleCount = 0;
        let buildingCount = 0;
        agents && agents.forEach(agent => {
            if(agent.get('status') === 'idle') {
                idleCount++;
            } else {
                buildingCount++;
            }
        });
        return (
            <div className="side-list side-summary">
                <header className="header">Summary</header>
                <ul className="list">
                    <li className="item">
                        <span className="status">idle</span>
                        <span className="count">{idleCount}</span>
                    </li>
                    <li className="item">
                        <span className="status">building</span>
                        <span className="count">{buildingCount}</span>
                    </li>
                </ul>
            </div>
        );
    }
}

SideSummary.propTypes = {
    agents: PropTypes.instanceOf(Immutable.List).isRequired
}