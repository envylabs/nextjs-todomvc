import Head from 'next/head';
import { FC } from 'react';
import { StoreContext } from '../contexts/store-context';
import NewTodo from './new-todo';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Next.js • TodoMVC</title>
      </Head>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <StoreContext.Consumer>
            {(store) => <NewTodo add={store.add.bind(store)} />}
          </StoreContext.Consumer>
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
