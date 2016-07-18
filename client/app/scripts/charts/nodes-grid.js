/* eslint react/jsx-no-bind: "off", no-multi-comp: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { Set as makeSet, List as makeList, Map as makeMap } from 'immutable';
import NodeDetailsTable from '../components/node-details/node-details-table';
import { clickNode, enterNode, leaveNode } from '../actions/app-actions';

import NodeDetailsRelatives from '../components/node-details/node-details-relatives';
import NodeDetailsTableNodeLink from '../components/node-details/node-details-table-node-link';
import { getNodeColor } from '../utils/color-utils';


const IGNORED_COLUMNS = ['docker_container_ports', 'docker_container_id', 'docker_image_id',
  'docker_container_command', 'docker_container_networks'];


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


function renderIdCell(props, onClick) {
  const style = {
    color: getNodeColor(props.rank, props.label_major)
  };

  return (
    <div className="nodes-grid-id-column" onClick={onClick}>
      <i style={style} className="fa fa-square" /> <NodeDetailsTableNodeLink {...props} />
      {props.parents && <NodeDetailsRelatives relatives={props.parents} />}
    </div>
  );
}


class NodesGrid extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderIdCell = this.renderIdCell.bind(this);
    this.clickRow = this.clickRow.bind(this);
  }

  clickRow(ev, nodeId, nodeLabel) {
    if (ev.target.className !== 'nodes-grid-id-column') {
      return;
    }
    this.props.clickNode(nodeId, nodeLabel);
  }

  renderIdCell(props) {
    return renderIdCell(props, (ev) => this.clickRow(ev, props.id, props.label));
  }

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
          renderIdCell={this.renderIdCell}
          tbodyStyle={tbodyStyle}
          topologyId={this.props.topologyId}
          onMouseOut={this.onMouseOut}
          onMouseOverRow={this.onMouseOverRow}
          {...detailsData}
          selectedNodeId={this.props.selectedNodeId}
          limit={1000} />
      </div>
    );
  }
}


export default connect(
  () => ({}),
  { clickNode }
)(NodesGrid);
