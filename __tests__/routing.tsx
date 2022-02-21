import { screen } from '@testing-library/react';
import { setupApp } from '../utils/setup-app';
import { addTodo } from '../utils/add-todo';
import { completeTodo } from '../utils/complete-todo';
import userEvent from '@testing-library/user-event';

describe('TodoMVC App Spec', () => {
  beforeEach(async () => {
    await setupApp();
  });

  describe('Routing', () => {
    it.skip('filters displayed todos', async () => {
      await addTodo('Todo #1');
      await addTodo('Todo #2');
      completeTodo('Todo #1');

      userEvent.click(screen.getByText('All'));

      expect(screen.getByText('Todo #1')).toBeInTheDocument();
      expect(screen.getByText('Todo #2')).toBeInTheDocument();

      userEvent.click(screen.getByText('Active'));
      // This doesn't appear to trigger the mocked router or update the router.query.

      expect(screen.queryByText('Todo #1')).not.toBeInTheDocument();
      expect(screen.getByText('Todo #2')).toBeInTheDocument();
    });
  });
});
