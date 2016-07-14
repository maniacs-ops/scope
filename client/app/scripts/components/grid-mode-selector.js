import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { toggleGridMode } from '../actions/app-actions';

class GridModeSelector extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.enableGridMode = this.enableGridMode.bind(this);
    this.disableGridMode = this.disableGridMode.bind(this);
  }

  enableGridMode() {
    return this.props.toggleGridMode(true);
  }

  disableGridMode() {
    return this.props.toggleGridMode(false);
  }

  renderItem(icons, isSelected, onClick) {
    const className = classNames('network-selector-action', {
      'network-selector-action-selected': isSelected
    });
    return (
      <div
        className={className}
        onClick={onClick} >
        <span className={icons} style={{fontSize: 16}} />
      </div>
    );
  }

  render() {
    const { gridMode } = this.props;

    return (
      <div className="network-selector">
        <div className="network-selector-wrapper">
          {this.renderItem('fa fa-th', !gridMode, this.disableGridMode)}
          {this.renderItem('fa fa-bars', gridMode, this.enableGridMode)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gridMode: state.get('gridMode'),
  };
}

export default connect(
  mapStateToProps,
  { toggleGridMode }
)(GridModeSelector);
