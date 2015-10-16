/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../typings/classnames/classnames.d.ts'/>
/// <reference path='../../typings/material-ui/material-ui.d.ts'/>

import * as React from 'react';
import * as classNames from 'classnames';
import TextField = require('material-ui/lib/text-field');

interface TodoTextInputProps {
  onSave: Function;
  text?: string;
  placeholder?: string,
  editing?: boolean;
  newTodo?: boolean;
}

class TodoTextInput extends React.Component<TodoTextInputProps, any> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    this.props.onSave(text);
    if (this.props.newTodo) {
      this.setState({ text: '' });
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  }

  render() {
    return (
      <TextField 
        type="text"
        floatingLabelText={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onEnterKeyDown={this.handleSubmit.bind(this)} />
    );
  }
}


export default TodoTextInput;