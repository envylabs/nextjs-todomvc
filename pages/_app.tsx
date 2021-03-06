import '../styles/globals.css';
import { List } from 'immutable';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import 'todomvc-app-css/index.css';
import { useState } from 'react';

import { add } from '../models/store';
import { Todo } from '../models/todo';

export interface DefaultProps {
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

let initialTodos = List<Todo>([]);

if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
  initialTodos = add(initialTodos, {
    title: 'Taste JavaScript',
    isComplete: true,
  });
  initialTodos = add(initialTodos, {
    title: 'Buy a unicorn',
    isComplete: false,
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  const [todos, setTodos] = useState(initialTodos);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    <NextIntlProvider messages={pageProps.messages}>
      <Component {...pageProps} setTodos={setTodos} todos={todos} />
    </NextIntlProvider>
  );
}

export default MyApp;
