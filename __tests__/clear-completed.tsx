import { screen } from '@testing-library/react';
import { setupApp } from '../utils/setup-app';
import { addTodo } from '../utils/add-todo';
import { completeTodo } from '../utils/complete-todo';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('TodoMVC App Spec', () => {
  beforeEach(async () => {
    await setupApp();
  });

  describe('Clear completed', () => {
    it('it removes completed todos when clicked', async () => {
      await addTodo('Todo #1');
      completeTodo('Todo #1');

      userEvent.click(screen.getByText('Clear completed'));

      expect(screen.queryByText('Todo #1')).not.toBeInTheDocument();
    });

    it('is hidden with no completed todos', async () => {
      expect(screen.queryByText('Clear completed')).not.toBeInTheDocument();

      await addTodo('Todo #1');

      expect(screen.queryByText('Clear completed')).not.toBeInTheDocument();

      completeTodo('Todo #1');

      expect(screen.getByText('Clear completed')).toBeInTheDocument();

      completeTodo('Todo #1'); // making it active again

      expect(screen.queryByText('Clear completed')).not.toBeInTheDocument();
    });
  });
});
