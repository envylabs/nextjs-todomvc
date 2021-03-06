import { List } from 'immutable';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

import { Todo } from '../models/todo';

import NewTodo from './new-todo';

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
          <Link href="/" locale="en">
            <a hrefLang="en" lang="en" rel="alternate">
              {t('en')}
            </a>
          </Link>
          <span> </span>
          <Link href="/" locale="es">
            <a hrefLang="es" lang="es" rel="alternate">
              {t('es')}
            </a>
          </Link>
        </p>
        <p>
          <Link href="/csr">{t('client-side request')}</Link>
          <span> </span>
          <Link href="/ssr">{t('server-side request')}</Link>
        </p>
      </footer>
    </>
  );
};

export default Layout;
