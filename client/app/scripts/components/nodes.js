import React from 'react';
import { connect } from 'react-redux';

// import NodesChart from '../charts/nodes-chart';
import NodesGrid from '../charts/nodes-grid';
import NodesError from '../charts/nodes-error';
import { isTopologyEmpty } from '../utils/topology-utils';
import { CANVAS_MARGINS } from '../constants/styles';

const navbarHeight = 160;
const marginTop = 0;

/**
 * dynamic coords precision based on topology size
 */
function getLayoutPrecision(nodesCount) {
  let precision;
  if (nodesCount >= 50) {
    precision = 0;
  } else if (nodesCount > 20) {
    precision = 1;
  } else if (nodesCount > 10) {
    precision = 2;
  } else {
    precision = 3;
  }

  return precision;
}

class Nodes extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleResize = this.handleResize.bind(this);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight - navbarHeight - marginTop
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  renderEmptyTopologyError(show) {
    return (
      <NodesError faIconClass="fa-circle-thin" hidden={!show}>
        <div className="heading">Nothing to show. This can have any of these reasons:</div>
        <ul>
          <li>We haven't received any reports from probes recently.
           Are the probes properly configured?</li>
          <li>There are nodes, but they're currently hidden. Check the view options
           in the bottom-left if they allow for showing hidden nodes.</li>
          <li>Containers view only: you're not running Docker,
           or you don't have any containers.</li>
        </ul>
      </NodesError>
    );
  }

  render() {
    const { nodes, topologyEmpty, highlightedNodeIds } = this.props;
    const layoutPrecision = getLayoutPrecision(nodes.size);
    const errorEmpty = this.renderEmptyTopologyError(topologyEmpty);

    return (
      <div className="nodes-wrapper">
        {topologyEmpty && errorEmpty}
        <NodesGrid {...this.state}
          nodeSize="24"
          nodes={nodes}
          width={1300}
          height={780}
          margins={CANVAS_MARGINS}
          layoutPrecision={layoutPrecision}
          highlightedNodeIds={highlightedNodeIds}
        />
      </div>
    );
  }

  handleResize() {
    this.setDimensions();
  }

  setDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight - navbarHeight - marginTop;

    this.setState({height, width});
  }
}

function mapStateToProps(state) {
  return {
    nodes: state.get('nodes'),
    topologyEmpty: isTopologyEmpty(state),
    highlightedNodeIds: state.get('highlightedNodeIds')
  };
}

export default connect(
  mapStateToProps
)(Nodes);
