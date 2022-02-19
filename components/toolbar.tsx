import classNames from 'classnames';
import { List } from 'immutable';
import Link from 'next/link';
import { FC, MouseEventHandler } from 'react';
import { removeCompleted } from '../models/store';
import { Todo } from '../models/todo';

export type Filter = 'all' | 'active' | 'completed';

interface Props {
  activeFilter?: string | string[] | undefined;
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

export const Toolbar: FC<Props> = ({ activeFilter, setTodos, todos }) => {
  const clearCompleted: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setTodos(removeCompleted(todos));
  };

  const anyCompleted = todos.some((todo) => todo.isComplete);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todos.size}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <Link href={{ query: { filter: 'all' } }}>
            <a
              className={classNames({
                selected: !activeFilter || activeFilter === 'all',
              })}
            >
              All
            </a>
          </Link>
        </li>
        <li>
          <Link href={{ query: { filter: 'active' } }}>
            <a
              className={classNames({
                selected: activeFilter === 'active',
              })}
            >
              Active
            </a>
          </Link>
        </li>
        <li>
          <Link href={{ query: { filter: 'completed' } }}>
            <a
              className={classNames({
                selected: activeFilter === 'completed',
              })}
            >
              Completed
            </a>
          </Link>
        </li>
      </ul>
      {anyCompleted && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};
