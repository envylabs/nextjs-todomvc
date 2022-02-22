import { render, RenderResult } from '@testing-library/react';
import { List } from 'immutable';
import { NextIntlProvider } from 'next-intl';
import { Todo } from '../models/todo';
import Home from '../pages/index';
import * as messages from '../messages/en.json';

function newApp(
  setTodos: (todos: List<Todo>) => void,
  todos: List<Todo>
): JSX.Element {
  return (
    <NextIntlProvider locale="en" messages={messages}>
      <Home setTodos={setTodos} todos={todos} />
    </NextIntlProvider>
  );
}

export async function setupApp(
  initialTodos: List<Todo> = List([])
): Promise<void> {
  let rerender: RenderResult['rerender'];

  const setTodos = (newTodos: List<Todo>) => {
    rerender(newApp(setTodos, newTodos));
  };

  const renderResult = await render(newApp(setTodos, initialTodos));
  rerender = renderResult.rerender;
}
