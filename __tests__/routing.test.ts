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

  describe('Routing', () => {
    it('filters displayed todos', async () => {
      await addTodo('Todo #1');
      await addTodo('Todo #2');
      completeTodo('Todo #1');

      userEvent.click(screen.getByText('All'));

      expect(screen.getByText('Todo #1')).toBeInTheDocument();
      expect(screen.getByText('Todo #2')).toBeInTheDocument();

      userEvent.click(screen.getByText('Active'));

      expect(screen.queryByText('Todo #1')).not.toBeInTheDocument();
      expect(screen.getByText('Todo #2')).toBeInTheDocument();

      userEvent.click(screen.getByText('Completed'));

      expect(screen.getByText('Todo #1')).toBeInTheDocument();
      expect(screen.queryByText('Todo #2')).not.toBeInTheDocument();

      userEvent.click(screen.getByText('All'));

      expect(screen.getByText('Todo #1')).toBeInTheDocument();
      expect(screen.getByText('Todo #2')).toBeInTheDocument();
    });
  });
});
