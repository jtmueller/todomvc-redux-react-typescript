/// <reference path='../../typings/immutable/immutable-overrides.d.ts'/>
import Immutable = require('immutable');

export interface Todo {
  id?: number;
  text: string;
  completed: boolean;
};

/// An immutable list of immutable Todo items.
export type TodoList = Immutable.List<Immutable.Record.IRecord<Todo>>;

/// Instantiating this constructor generates an immutable Todo record wrapper.
export const TodoRecord = Immutable.Record<Todo>({ text:'', completed: false, id: -1 }, "Todo");
