import { screen } from '@testing-library/react';
import { setupApp } from '../utils/setup-app';
import { findNewTodoInput } from '../utils/find-new-todo-input';
import { addTodo } from '../utils/add-todo';

describe('TodoMVC App Spec', () => {
  beforeEach(async () => {
    await setupApp();
  });

  describe('New todo', () => {
    it('focuses the new todo input on load', async () => {
      expect(await findNewTodoInput()).toHaveFocus();
    });

    it('adds a new todo with ENTER', async () => {
      await addTodo('Todo #1{enter}');
      expect(screen.getByText('Todo #1')).toBeInTheDocument();
    });

    it('clears the new todo when submitted', async () => {
      await addTodo('Todo #1{enter}');
      expect(await findNewTodoInput()).toHaveValue(''); // Clears the input
    });

    it('trims new todos', async () => {
      await addTodo('\t Todo With Whitespace \t {enter}');
      expect(screen.getByText('Todo With Whitespace')).toBeInTheDocument();
    });

    it('does not add a todo of whitespace', async () => {
      await addTodo('\t {enter}');
      expect(screen.queryByText('\t ')).not.toBeInTheDocument();
    });
  });
});
