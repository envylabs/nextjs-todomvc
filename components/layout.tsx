import { List } from 'immutable';
import Head from 'next/head';
import { FC } from 'react';
import { Todo } from '../models/todo';
import NewTodo from './new-todo';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Props {
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

const Layout: FC<Props> = ({ children, setTodos, todos }) => {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>{t('PageTitle')}</title>
      </Head>
      <section className="todoapp">
        <header className="header">
          <h1>{t('todos')}</h1>
          <NewTodo setTodos={setTodos} todos={todos} />
        </header>
        {children}
      </section>
      <footer className="info">
        <p>{t('Double-click to edit a todo')}</p>
        <p>
          {t.rich('Part of <link>TodoMVC</link>', {
            link: (children) => <a href="http://todomvc.com/">{children}</a>,
          })}
        </p>
        <p>
          <Link href="" locale="en">
            {t('en')}
          </Link>
          <Link href="" locale="es">
            {t('es')}
          </Link>
        </p>
      </footer>
    </>
  );
};

export default Layout;
