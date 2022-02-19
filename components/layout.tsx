import { List } from 'immutable';
import Head from 'next/head';
import { FC } from 'react';
import { Todo } from '../models/todo';
import NewTodo from './new-todo';

interface Props {
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

const Layout: FC<Props> = ({ children, setTodos, todos }) => {
  return (
    <>
      <Head>
        <title>Next.js • TodoMVC</title>
      </Head>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo setTodos={setTodos} todos={todos} />
        </header>
        {children}
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
};

export default Layout;
