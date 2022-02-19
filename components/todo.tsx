import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import { Todo as TodoModel } from '../models/todo';
import classnames from 'classnames';
import { List } from 'immutable';
import { remove, update } from '../models/store';

interface Props {
  setTodos: (todos: List<TodoModel>) => void;
  todo: TodoModel;
  todos: List<TodoModel>;
}

const Todo: FC<Props> = ({ setTodos, todo, todos }) => {
  const [isEditing, toggleIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const todoClasses = classnames({
    editing: isEditing,
    completed: !isEditing && todo.isComplete,
  });

  const persistTitle: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setTodos(update(todos, todo, { title }));
    setTitle(todo.title);
    toggleIsEditing(false);
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

  return (
    <>
      <li className={todoClasses}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.isComplete}
            onChange={toggleIsComplete}
          />
          <label onDoubleClick={toggleEditing}>{todo.title}</label>
          <button className="destroy" onClick={removeTodo}></button>
        </div>
        {isEditing && (
          <form onSubmit={persistTitle}>
            <input className="edit" value={title} onChange={updateTitle} />
          </form>
        )}
      </li>
    </>
  );
};

export default Todo;
