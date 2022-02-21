import { render, screen } from '@testing-library/react';
import { List } from 'immutable';
import { NextIntlProvider } from 'next-intl';
import { Todo } from '../models/todo';
import { mockUseRouter } from '../utils/mock-use-router';
import Home from '../pages/index';
import * as messages from '../messages/en.json';

describe('TodoMVC App Spec', () => {
  describe('No todos', () => {
    it('hides the #main content', async () => {
      mockUseRouter({});

      const todos: List<Todo> = List([]);
      const setTodos = (todos: List<Todo>) => {};

      await render(
        <NextIntlProvider locale="en" messages={messages}>
          <Home setTodos={setTodos} todos={todos} />
        </NextIntlProvider>
      );

      const completeToggle = screen.queryByText('Mark all as complete');

      expect(completeToggle).not.toBeInTheDocument();
    });

    it('hides the #footer content', async () => {
      mockUseRouter({});

      const todos: List<Todo> = List([]);
      const setTodos = (todos: List<Todo>) => {};

      await render(
        <NextIntlProvider locale="en" messages={messages}>
          <Home setTodos={setTodos} todos={todos} />
        </NextIntlProvider>
      );

      const itemCount = screen.queryByText('0 items left');

      expect(itemCount).not.toBeInTheDocument();
    });
  });
});
