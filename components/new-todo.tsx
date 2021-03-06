import { List } from 'immutable';
import { useTranslations } from 'next-intl';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import { add } from '../models/store';
import { Todo } from '../models/todo';

interface Props {
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

const NewTodo: FC<Props> = ({ setTodos, todos }) => {
  const [title, setTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
        className="new-todo"
        onChange={updateTitle}
        placeholder={t('What needs to be done?')}
        ref={inputRef}
        value={title}
      />
    </form>
  );
};

export default NewTodo;
