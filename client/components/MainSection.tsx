/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../node_modules/immutable/dist/Immutable.d.ts'/>
/// <reference path='../../typings/material-ui/material-ui.d.ts'/>

import * as React from 'react';
import CardText = require('material-ui/lib/card/card-text');
import Table = require('material-ui/lib/table/table');
import TableHeader = require('material-ui/lib/table/table-header');
import TableHeaderColumn = require('material-ui/lib/table/table-header-column');
import TableRow = require('material-ui/lib/table/table-row');
import TableRowColumn = require('material-ui/lib/table/table-row-column');
import TableFooter = require('material-ui/lib/table/table-footer');
import TableBody = require('material-ui/lib/table/table-body');

import { Todo, TodoList } from '../models/todos';
import TodoItem from './TodoItem';
import Footer from './Footer';
import TodoTextInput from './TodoTextInput';

import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo:Todo) => !todo.completed,
  [SHOW_COMPLETED]: (todo:Todo) => todo.completed
};

interface MainSectionProps {
  todos: TodoList;
  actions: any;
};

class MainSection extends React.Component<MainSectionProps, any> {
  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.size > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.size}
               onChange={() => actions.completeAll()} />
      );
    }
  }

  renderFooter(completedCount: number) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.size - completedCount;

    if (todos.size) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      );
    }
  }
  
  handleSave(text) {
    if (text.length !== 0) {
      this.props.actions.addTodo(text);
    }
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count: number, todo): number =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <div>
                    <TodoTextInput
                newTodo
                onSave={this.handleSave.bind(this)}
                placeholder="What needs to be done?" />
      <Table
        fixedHeader={true}
        multiSelectable={true}
        onRowSelection={selected => console.log(selected)}>
        <TableHeader enableSelectAll={todos.size > 0}>
          <TableRow>
            <TableHeaderColumn/>
            <TableHeaderColumn/>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false} multiSelectable={true} displayRowCheckbox={true}>
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              { ...actions }/>
          )}
        </TableBody>
      </Table>
      </div>
    );
  }
}

export default MainSection;
