import classNames from 'classnames';
import { List } from 'immutable';
import Link from 'next/link';
import { FC, MouseEventHandler } from 'react';
import { removeCompleted } from '../models/store';
import { Todo } from '../models/todo';
import { useTranslations } from 'next-intl';

export type Filter = 'all' | 'active' | 'completed';

interface Props {
  activeFilter?: string | string[] | undefined;
  activeTodos: List<Todo>;
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

export const Toolbar: FC<Props> = ({
  activeFilter,
  activeTodos,
  setTodos,
  todos,
}) => {
  const t = useTranslations();
  const clearCompleted: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setTodos(removeCompleted(todos));
  };

  const anyCompleted = todos.some((todo) => todo.isComplete);

  return (
    <footer className="footer">
      <span className="todo-count">
        {t.rich('n items left', {
          count: activeTodos.size,
          strong: (children) => <strong>{children}</strong>,
        })}
      </span>
      <ul className="filters">
        <li>
          <Link href={{ query: { filter: 'all' } }}>
            <a
              className={classNames({
                selected: !activeFilter || activeFilter === 'all',
              })}
            >
              {t('All')}
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
              {t('Active')}
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
              {t('Completed')}
            </a>
          </Link>
        </li>
      </ul>
      {anyCompleted && (
        <button className="clear-completed" onClick={clearCompleted}>
          {t('Clear completed')}
        </button>
      )}
    </footer>
  );
};
