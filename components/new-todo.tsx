import { FC } from 'react';

const NewTodo: FC = () => (
  <input
    className="new-todo"
    placeholder="What needs to be done?"
    autoFocus={true}
  />
);

export default NewTodo;
