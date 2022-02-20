import { List } from 'immutable';
import { ChangeEventHandler, FC } from 'react';
import { updateAll } from '../models/store';
import { Todo } from '../models/todo';
import TodoComponent from './todo';
import { useTranslations } from 'next-intl';

interface Props {
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

const TodoList: FC<Props> = ({ setTodos, todos }) => {
  const t = useTranslations();
  const isAllComplete = todos.every((todo) => todo.isComplete);

  const toggleAllIsComplete: ChangeEventHandler<HTMLInputElement> = () => {
    setTodos(updateAll(todos, { isComplete: !isAllComplete }));
  };

  if (todos.size === 0) return null;

  return (
    <section className="main">
      <input
        checked={isAllComplete}
        className="toggle-all"
        id="toggle-all"
        onChange={toggleAllIsComplete}
        type="checkbox"
      />
      <label htmlFor="toggle-all">{t('Mark all as complete')}</label>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoComponent
            key={todo.id}
            setTodos={setTodos}
            todo={todo}
            todos={todos}
          />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
