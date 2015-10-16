/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../typings/classnames/classnames.d.ts'/>
/// <reference path='../../typings/material-ui/material-ui.d.ts'/>

import * as React from 'react';
import * as classNames from 'classnames';
import TableRow = require('material-ui/lib/table/table-row');
import TableRowColumn = require('material-ui/lib/table/table-row-column');
import Colors = require('material-ui/lib/styles/colors');
import FontIcon = require('material-ui/lib/font-icon');

import { Todo } from '../models/todos';
import TodoTextInput from './TodoTextInput';

interface TodoItemProps {
  todo: Todo;
  editTodo: Function;
  deleteTodo: Function;
  completeTodo: Function;
  key?: any;
}

class TodoItem extends React.Component<TodoItemProps, any> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(todo, text) {
    if (text.length === 0) {
      this.props.deleteTodo(todo);
    } else {
      this.props.editTodo(todo, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TableRow selected={todo.completed} key={todo.id} rowNumber={todo.id}>
          <TableRowColumn>
            <TodoTextInput text={todo.text}
                           editing={this.state.editing}
                           onSave={(text) => this.handleSave(todo, text)}/>
          </TableRowColumn>
        </TableRow>
      );
    } else {
      element = (
        <TableRow selected={todo.completed} key={todo.id} rowNumber={todo.id}>
          <TableRowColumn>
            <label onDoubleClick={this.handleDoubleClick.bind(this)}>
              {todo.text}
            </label>
          </TableRowColumn>
          <TableRowColumn>
            <FontIcon className="material-icons" color={Colors.red700}>clear</FontIcon>
          </TableRowColumn>
        </TableRow>
      );
    }

    return element;
  }
}

//          <input className="toggle"
//                 type="checkbox"
//                 checked={todo.completed}
//                 onChange={() => completeTodo(todo)} />

export default TodoItem;
