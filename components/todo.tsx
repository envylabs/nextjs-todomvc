import classNames from 'classnames';
import { List } from 'immutable';
import { useTranslations } from 'next-intl';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
} from 'react';

import { remove, update } from '../models/store';
import { Todo as TodoModel } from '../models/todo';

interface Props {
  setTodos: (todos: List<TodoModel>) => void;
  todo: TodoModel;
  todos: List<TodoModel>;
}

const Todo: FC<Props> = ({ setTodos, todo, todos }) => {
  const [isEditing, toggleIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const t = useTranslations();

  const todoClasses = classNames({
    editing: isEditing,
    completed: !isEditing && todo.isComplete,
  });

  const persistTitle = () => {
    const value = title.trim();

    if (value.length === 0) {
      setTodos(remove(todos, todo));
      toggleIsEditing(false);
      return;
    }

    setTodos(update(todos, todo, { title: value }));
    setTitle(value);
    toggleIsEditing(false);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    persistTitle();
  };

  const toggleIsComplete: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTodos(update(todos, todo, { isComplete: event.currentTarget.checked }));
  };

  const toggleEditing: MouseEventHandler<HTMLLabelElement> = (event) => {
    event.preventDefault();
    toggleIsEditing(true);
  };

  const removeTodo: MouseEventHandler<HTMLButtonElement> = () => {
    setTodos(remove(todos, todo));
  };

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.currentTarget.value);
  };

  const revertForEscape: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      toggleIsEditing(false);
      setTitle(todo.title);
    }
  };

  return (
    <>
      <li className={todoClasses}>
        <div className="view">
          <input
            aria-label={t('Complete title', { title: todo.title })}
            className="toggle"
            type="checkbox"
            checked={todo.isComplete}
            onChange={toggleIsComplete}
          />
          <label onDoubleClick={toggleEditing} role="button">
            {todo.title}
          </label>
          <button
            aria-label={t('Remove title', { title: todo.title })}
            className="destroy"
            onClick={removeTodo}
          ></button>
        </div>
        {isEditing && (
          <form onSubmit={onSubmit}>
            <input
              aria-label={t('Edit title', { title: todo.title })}
              autoFocus
              className="edit"
              onBlur={persistTitle}
              onChange={updateTitle}
              onKeyDown={revertForEscape}
              value={title}
            />
          </form>
        )}
      </li>
    </>
  );
};

export default Todo;
