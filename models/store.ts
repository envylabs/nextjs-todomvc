import { List } from 'immutable';
import { Todo } from './todo';

let id = 0;

export function add(
  todos: List<Todo>,
  { isComplete, title }: Pick<Todo, 'isComplete' | 'title'>
): List<Todo> {
  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) return todos;

  const todo = Todo({
    id: (++id).toString(),
    isComplete,
    title: trimmedTitle,
  });

  return todos.push(todo);
}

export function remove(todos: List<Todo>, todo: Todo): List<Todo> {
  return todos.delete(todos.indexOf(todo));
}

export function removeCompleted(todos: List<Todo>): List<Todo> {
  return todos.filterNot((todo) => todo.isComplete);
}

export function updateAll(
  todos: List<Todo>,
  properties: Omit<Partial<Todo>, 'id'>
): List<Todo> {
  return todos.map((todo) => todo.merge(properties));
}

export function update(
  todos: List<Todo>,
  todo: Todo,
  properties: Omit<Partial<Todo>, 'id'>
): List<Todo> {
  const index = todos.indexOf(todo);
  const newTodo = Todo(Object.assign({}, todo, properties));

  return todos.update(index, (todo) => {
    if (!todo) {
      return Todo();
    }

    return todo?.merge(properties);
  });
}
