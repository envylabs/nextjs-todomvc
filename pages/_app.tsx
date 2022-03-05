import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'todomvc-app-css/index.css';
import { useState } from 'react';
import { Todo } from '../models/todo';
import { List } from 'immutable';
import { add } from '../models/store';
import { NextIntlProvider } from 'next-intl';

export interface DefaultProps {
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

function MyApp({ Component, pageProps }: AppProps) {
  let initialTodos = List<Todo>([]);
  initialTodos = add(initialTodos, {
    title: 'Taste JavaScript',
    isComplete: true,
  });
  initialTodos = add(initialTodos, {
    title: 'Buy a unicorn',
    isComplete: false,
  });

  const [todos, setTodos] = useState(initialTodos);

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Component {...pageProps} setTodos={setTodos} todos={todos} />
    </NextIntlProvider>
  );
}

export default MyApp;
