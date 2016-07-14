/* eslint react/jsx-no-bind: "off", no-multi-comp: "off" */

import React from 'react';
import { Set as makeSet, List as makeList, Map as makeMap } from 'immutable';
import NodeDetailsTable from '../components/node-details/node-details-table';
import { enterNode, leaveNode } from '../actions/app-actions';


const IGNORED_COLUMNS = ['docker_container_ports'];


function getColumns(nodes) {
  const allColumns = nodes.toList().flatMap(n => {
    const metrics = (n.get('metrics') || makeList())
      .map(m => makeMap({ id: m.get('id'), label: m.get('label') }));
    const metadata = (n.get('metadata') || makeList())
      .map(m => makeMap({ id: m.get('id'), label: m.get('label') }));
    return metadata.concat(metrics);
  });
  return makeSet(allColumns).filter(n => !IGNORED_COLUMNS.includes(n.get('id'))).toJS();
}


export default class NodesGrid extends React.Component {

  onMouseOverRow(node) {
    enterNode(node.id);
  }

  onMouseOut() {
    leaveNode();
  }

  render() {
    const { margins, nodes, height } = this.props;
    const cmpStyle = {
      height,
      marginTop: margins.top,
      paddingLeft: margins.left,
      paddingRight: margins.right,
    };
    const tbodyHeight = height - 24 - 18;
    const className = 'scroll-body';
    const tbodyStyle = {
      height: `${tbodyHeight}px`,
      paddingBottom: 160
    };

    const detailsData = {
      label: 'procs',
      id: '',
      nodes: nodes.toList().toJS(),
      columns: getColumns(nodes)
    };

    return (
      <div className="nodes-grid">
        <NodeDetailsTable
          style={cmpStyle}
          className={className}
          tbodyStyle={tbodyStyle}
          topologyId={this.props.topologyId}
          onMouseOut={this.onMouseOut}
          onMouseOverRow={this.onMouseOverRow}
          {...detailsData}
          highlightedNodeIds={this.props.highlightedNodeIds}
          limit={1000} />
      </div>
    );
  }
}
