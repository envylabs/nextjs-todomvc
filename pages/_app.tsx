import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import 'todomvc-app-css/index.css';
import { useState } from 'react';
import { Todo } from '../models/todo';
import { List } from 'immutable';
import { add } from '../models/store';

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
    <Layout setTodos={setTodos} todos={todos}>
      <Component {...pageProps} setTodos={setTodos} todos={todos} />
    </Layout>
  );
}

export default MyApp;
