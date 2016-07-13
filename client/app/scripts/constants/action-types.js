import _ from 'lodash';

const ACTION_TYPES = [
  'ADD_QUERY_FILTER',
  'BLUR_SEARCH',
  'CHANGE_TOPOLOGY_OPTION',
  'CLEAR_CONTROL_ERROR',
  'CLICK_BACKGROUND',
  'CLICK_CLOSE_DETAILS',
  'CLICK_CLOSE_TERMINAL',
  'CLICK_FORCE_RELAYOUT',
  'CLICK_NODE',
  'CLICK_PAUSE_UPDATE',
  'CLICK_RELATIVE',
  'CLICK_RESUME_UPDATE',
  'CLICK_SHOW_TOPOLOGY_FOR_NODE',
  'CLICK_TERMINAL',
  'CLICK_TOPOLOGY',
  'CLOSE_WEBSOCKET',
  'DESELECT_NODE',
  'DO_CONTROL',
  'DO_CONTROL_ERROR',
  'DO_CONTROL_SUCCESS',
  'DO_SEARCH',
  'ENTER_EDGE',
  'ENTER_NODE',
  'FOCUS_SEARCH',
  'HIDE_HELP',
  'LEAVE_EDGE',
  'LEAVE_NODE',
  'PIN_METRIC',
  'PIN_SEARCH',
  'UNPIN_METRIC',
  'UNPIN_SEARCH',
  'OPEN_WEBSOCKET',
  'RECEIVE_CONTROL_NODE_REMOVED',
  'RECEIVE_CONTROL_PIPE',
  'RECEIVE_CONTROL_PIPE_STATUS',
  'RECEIVE_NODE_DETAILS',
  'RECEIVE_NODES',
  'RECEIVE_NODES_DELTA',
  'RECEIVE_NODES_FOR_TOPOLOGY',
  'RECEIVE_NOT_FOUND',
  'RECEIVE_TOPOLOGIES',
  'RECEIVE_API_DETAILS',
  'RECEIVE_ERROR',
  'ROUTE_TOPOLOGY',
  'SELECT_METRIC',
  'SHOW_HELP',
  'SET_EXPORTING_GRAPH',

  'SELECT_NETWORK',
  'PIN_NETWORK',
  'UNPIN_NETWORK',
  'SHOW_NETWORKS',
  'SORT_ORDER_CHANGED',

  'SET_GRID_MODE',
];

export default _.zipObject(ACTION_TYPES, ACTION_TYPES);
