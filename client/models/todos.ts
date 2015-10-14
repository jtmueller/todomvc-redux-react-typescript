/// <reference path='../../typings/immutable/immutable-overrides.d.ts'/>
import Immutable = require('immutable');

export type Todo = {
  id?: number;
  text: string;
  completed: boolean;
};

export type TodoList = Immutable.List<Immutable.Record.IRecord<Todo>>;

export const TodoRecord = Immutable.Record({ text:'', completed: false, id: -1 }, "Todo");
