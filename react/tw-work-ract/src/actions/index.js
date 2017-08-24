import * as actionTypes from '../constants/ActionTypes';

export function initUserInfo(userInfo) {
    return {
        type: actionTypes.INIT_USERINFO,
        userInfo
    };
}

export function initAgents(agents) {
    return {
        type: actionTypes.INIT_AGENTS,
        agents
    };
}

export function initHistory(history) {
    return {
        type: actionTypes.INIT_HISTORY,
        history
    };
}

export function denyAgent(agentIndex) {
    return {
        type: actionTypes.DENY_AGENT,
        agentIndex: agentIndex
    };
}

export function addResource(agentIndex, resourceArr) {
    return {
        type: actionTypes.ADD_RESOURCE,
        agentIndex,
        resourceArr
    };
}

export function deleteResource(agentIndex, resourceIndex) {
    return {
        type: actionTypes.DELETE_RESOURCE,
        agentIndex,
        resourceIndex
    };
}

export function addAgent(agent) {
    return {
        type: actionTypes.ADD_AGENT,
        agent
    };
}