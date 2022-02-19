import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { StoreContext } from '../contexts/store-context';
import { Store } from '../models/store';

const NewTodo: FC = () => {
  const [title, setTitle] = useState<string>('');

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.currentTarget.value.trim();

    if (value.length === 0) return;

    setTitle(value);
  };

  const onSubmit =
    (store: Store): FormEventHandler<HTMLFormElement> =>
    (event) => {
      event.preventDefault();

      if (title.length === 0) return;

      store.add(title);
      setTitle('');
    };

  return (
    <StoreContext.Consumer>
      {(store) => (
        <form onSubmit={onSubmit(store)}>
          <input
            autoFocus={true}
            className="new-todo"
            onChange={updateTitle}
            placeholder="What needs to be done?"
            value={title}
          />
        </form>
      )}
    </StoreContext.Consumer>
  );
};

export default NewTodo;
