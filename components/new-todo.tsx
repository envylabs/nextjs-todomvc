import { List } from 'immutable';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { add } from '../models/store';
import { Todo } from '../models/todo';

interface Props {
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

const NewTodo: FC<Props> = ({ setTodos, todos }) => {
  const [title, setTitle] = useState<string>('');

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setTodos(add(todos, { isComplete: false, title }));
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        autoFocus={true}
        className="new-todo"
        onChange={updateTitle}
        placeholder="What needs to be done?"
        value={title}
      />
    </form>
  );
};

export default NewTodo;
