/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../typings/classnames/classnames.d.ts'/>
/// <reference path='../../typings/material-ui/material-ui.d.ts'/>

import * as React from 'react';
import * as classNames from 'classnames';

import TableFooter = require('material-ui/lib/table/table-footer');
import TableRow = require('material-ui/lib/table/table-row');
import TableRowColumn = require('material-ui/lib/table/table-row-column');
import FlatButton = require('material-ui/lib/flat-button');

import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};


interface FooterProps {
  completedCount: number;
  activeCount: number;
  filter: string;
  onClearCompleted: Function;
  onShow: Function;
}

class Footer extends React.Component<FooterProps, any> {
  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <TableRowColumn>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </TableRowColumn>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <FlatButton
        primary={filter === selectedFilter}
        onClick={() => onShow(filter)}>
        {title}
      </FlatButton>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <TableRowColumn>
          <FlatButton secondary={true}
                  onClick={() => onClearCompleted()}>
            Clear completed
          </FlatButton>
        </TableRowColumn>
      );
    }
  }

  render() {
    return (
      <TableFooter adjustForCheckbox={true}>
        <TableRow>
          {this.renderTodoCount()}
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <TableRowColumn key={filter}>
              {this.renderFilterLink(filter)}
            </TableRowColumn>
          )}
          {this.renderClearButton()}
        </TableRow>
      </TableFooter>
    );
  }
}

export default Footer;
