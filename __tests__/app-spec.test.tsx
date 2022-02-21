import { render, screen } from '@testing-library/react';
import { List } from 'immutable';
import { NextIntlProvider } from 'next-intl';
import { Todo } from '../models/todo';
import { mockUseRouter } from '../utils/mock-use-router';
import Home from '../pages/index';
import * as messages from '../messages/en.json';

describe('TodoMVC App Spec', () => {
  it('hides #main and #footer with no todos', async () => {
    mockUseRouter({});

    const todos: List<Todo> = List([]);
    const setTodos = (todos: List<Todo>) => {};

    await render(
      <NextIntlProvider locale="en" messages={messages}>
        <Home setTodos={setTodos} todos={todos} />
      </NextIntlProvider>
    );

    const completeToggle = screen.queryByText('Mark all as complete');
    const itemCount = screen.queryByText('0 items left');

    expect(completeToggle).not.toBeInTheDocument();
    expect(itemCount).not.toBeInTheDocument();
  });
});
