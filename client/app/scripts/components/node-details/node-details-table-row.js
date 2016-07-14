import React from 'react';
import classNames from 'classnames';

import NodeDetailsTableNodeLink from './node-details-table-node-link';
import NodeDetailsTableNodeMetric from './node-details-table-node-metric';


function getValuesForNode(node) {
  const values = {};
  ['metrics', 'metadata'].forEach(collection => {
    if (node[collection]) {
      node[collection].forEach(field => {
        const result = Object.assign({}, field);
        result.valueType = collection;
        values[field.id] = result;
      });
    }
  });
  return values;
}


function renderValues(node, columns = [], columnWidths = []) {
  const fields = getValuesForNode(node);
  return columns.map(({id}, i) => {
    const field = fields[id];
    const style = { width: columnWidths[i] };
    if (field) {
      if (field.valueType === 'metadata') {
        return (
          <td className="node-details-table-node-value truncate" title={field.value}
            style={style}
            key={field.id}>
            {field.value}
          </td>
        );
      }
      return <NodeDetailsTableNodeMetric style={style} key={field.id} {...field} />;
    }
    // empty cell to complete the row for proper hover
    return <td className="node-details-table-node-value" style={style} key={id} />;
  });
}

export default class NodeDetailsTableRow extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver() {
    const { node, onMouseOverRow } = this.props;
    onMouseOverRow(node);
  }

  render() {
    const { node, nodeIdKey, topologyId, columns, onMouseOverRow, selected, widths } = this.props;
    const [firstColumnWidth, ...columnWidths] = widths;
    console.log(widths);
    const values = renderValues(node, columns, columnWidths);
    const nodeId = node[nodeIdKey];
    const className = classNames('node-details-table-node', { selected });
    return (
      <tr onMouseOver={onMouseOverRow && this.onMouseOver} className={className}>
        <td className="node-details-table-node-label truncate" style={{ width: firstColumnWidth }}>
          <NodeDetailsTableNodeLink
            topologyId={topologyId}
            nodeId={nodeId}
            {...node} />
        </td>
        {values}
      </tr>
    );
  }
}
