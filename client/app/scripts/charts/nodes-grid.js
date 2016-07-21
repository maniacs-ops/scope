/* eslint react/jsx-no-bind: "off", no-multi-comp: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { List as makeList, Map as makeMap } from 'immutable';
import NodeDetailsTable from '../components/node-details/node-details-table';
import { clickNode, enterNode, leaveNode, sortOrderChanged } from '../actions/app-actions';

import NodeDetailsRelatives from '../components/node-details/node-details-relatives';
import { getNodeColor } from '../utils/color-utils';


const IGNORED_COLUMNS = ['docker_container_ports', 'docker_container_id', 'docker_image_id',
  'docker_container_command', 'docker_container_networks'];


function getColumns(nodes) {
  const metricColumns = nodes
    .toList()
    .flatMap(n => {
      const metrics = (n.get('metrics') || makeList())
        .map(m => makeMap({ id: m.get('id'), label: m.get('label') }));
      return metrics;
    })
    .toSet()
    .toList()
    .sortBy(m => m.get('label'));

  const metadataColumns = nodes
    .toList()
    .flatMap(n => {
      const metadata = (n.get('metadata') || makeList())
        .map(m => makeMap({ id: m.get('id'), label: m.get('label') }));
      return metadata;
    })
    .toSet()
    .filter(n => !IGNORED_COLUMNS.includes(n.get('id')))
    .toList()
    .sortBy(m => m.get('label'));

  return metadataColumns.concat(metricColumns).toJS();
}


function renderIdCell(props, onClick) {
  const style = {
    width: 16,
    flex: 'none',
    color: getNodeColor(props.rank, props.label_major)
  };

  return (
    <div className="nodes-grid-id-column" onClick={onClick}>
      <div className="content">
        <div style={style}><i className="fa fa-square" /></div>
        <div className="truncate">{props.label}</div>
        {props.parents && <NodeDetailsRelatives relatives={props.parents} />}
      </div>
    </div>
  );
}


class NodesGrid extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderIdCell = this.renderIdCell.bind(this);
    this.clickRow = this.clickRow.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }

  clickRow(ev, nodeId, nodeLabel) {
    if (ev.target.className === 'node-details-relatives-link') {
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

  onSortChange(sortBy, sortedDesc) {
    this.props.sortOrderChanged(sortBy, sortedDesc);
  }

  render() {
    const { margins, nodes, height, gridSortBy, gridSortedDesc } = this.props;
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
          onSortChange={this.onSortChange}
          {...detailsData}
          sortBy={gridSortBy}
          sortedDesc={gridSortedDesc}
          selectedNodeId={this.props.selectedNodeId}
          limit={1000} />
      </div>
    );
  }
}


export default connect(
  () => ({}),
  { clickNode, sortOrderChanged }
)(NodesGrid);
