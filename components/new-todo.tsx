import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { Store } from '../models/store';

interface Props {
  add: Store['add'];
}

const NewTodo: FC<Props> = ({ add }) => {
  const [title, setTitle] = useState<string>('');

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    add(title);
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
