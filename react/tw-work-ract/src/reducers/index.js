import { Map, List, fromJS } from 'immutable';
import * as actionTypes from '../constants/ActionTypes';

export default function reducer(state = Map(), action) {
    switch(action.type) {
        case actionTypes.INIT_USERINFO:
            return state.merge({
                userInfo: action.userInfo
            });
        case actionTypes.INIT_AGENTS:
            return state.merge({
                agents: action.agents
            });
        case actionTypes.INIT_HISTORY:
            return state.merge({
                history: action.history
            });
        case actionTypes.DENY_AGENT:
            return state.setIn(['agents', action.agentIndex, 'denied'], true);
        case actionTypes.ADD_AGENT:
            return state.set('agents', state.get('agents').push(fromJS(action.agent)));
        case actionTypes.ADD_RESOURCE:
            return state.setIn(['agents', action.agentIndex, 'resources'], List(action.resourceArr));;
        case actionTypes.DELETE_RESOURCE:
            return state.deleteIn(['agents', action.agentIndex, 'resources', action.resourceIndex]);
        default:
            return state;
    }
}