/// <reference path='../../typings/lodash/lodash.d.ts'/>
/// <reference path='../../typings/redux-actions/redux-actions.d.ts'/>
/// <reference path='../../node_modules/immutable/dist/Immutable.d.ts'/>

import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';
import Immutable = require('immutable'); // for some reason import/from gives a "no default export" error

import { Todo } from '../models/todos';
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from '../constants/ActionTypes';

type TodoList = Immutable.List<Immutable.Map<string, any>>;

var TodoRecord = Immutable.Record({ text:'', completed: false, id: -1 });

const initialState = Immutable.List([new TodoRecord({
  text: 'Use Redux with TypeScript',
  completed: false,
  id: 0
})]);

export default handleActions<TodoList>({
  [ADD_TODO]: (state: TodoList, action: Action) : TodoList => {
    return state.unshift(new TodoRecord({
      id: state.reduce((maxId, todo) => Math.max(todo.get('id'), maxId), -1) + 1,
      completed: action.payload.completed,
      text: action.payload.text
    }));
  },
  
  [DELETE_TODO]: (state: TodoList, action: Action): TodoList => {
    return state.filter(todo =>
      todo.get('id') !== action.payload.id
    ).toList();
  },
  
  [EDIT_TODO]: (state: TodoList, action: Action): TodoList => {
    return state.map(todo =>
      todo.get('id') === action.payload.id
        ? todo.set('text', action.payload.text)
        : todo
    ).toList();
  },
  
  [COMPLETE_TODO]: (state: TodoList, action: Action): TodoList => {
    return state.map(todo =>
      todo.get('id') === action.payload.id
        ? todo.set('completed', !todo.get('completed'))
        : todo
    ).toList();
  },
  
  [COMPLETE_ALL]: (state: TodoList, action: Action): TodoList => {
    const areAllMarked = state.every(todo => todo.get('completed'));
    return state.map(todo => todo.set('completed', !areAllMarked)).toList();
  },

  [CLEAR_COMPLETED]: (state: TodoList, action: Action): TodoList => {
    return state.filter(todo => todo.get('completed') === false).toList();
  }
}, initialState);
