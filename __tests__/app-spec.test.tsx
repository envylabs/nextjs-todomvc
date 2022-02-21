import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupApp } from '../utils/setup-app';
import { findNewTodoInput } from '../utils/find-new-todo-input';
import { addTodo } from '../utils/add-todo';
import { isCompleted } from '../utils/is-completed';
import { completeTodo } from '../utils/complete-todo';

describe('TodoMVC App Spec', () => {
  beforeEach(async () => {
    await setupApp();
  });

  describe('No todos', () => {
    it('hides the #main content', async () => {
      expect(
        screen.queryByText('Mark all as complete')
      ).not.toBeInTheDocument();
    });

    it('hides the #footer content', async () => {
      expect(screen.queryByText('0 items left')).not.toBeInTheDocument();
    });
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

  describe('Mark all as complete', () => {
    it('toggles all todo completions when checked', async () => {
      await addTodo('Todo #1');
      await addTodo('Todo #2');

      expect(await isCompleted('Todo #1')).toBeFalsy();
      expect(await isCompleted('Todo #2')).toBeFalsy();

      const markAllCompleted = await screen.findByLabelText<HTMLInputElement>(
        'Mark all as complete'
      );

      userEvent.click(markAllCompleted);

      expect(markAllCompleted).toBeChecked();
      expect(await isCompleted('Todo #1')).toBeTruthy();
      expect(await isCompleted('Todo #2')).toBeTruthy();

      userEvent.click(markAllCompleted);

      expect(markAllCompleted).not.toBeChecked();
      expect(await isCompleted('Todo #1')).toBeFalsy();
      expect(await isCompleted('Todo #2')).toBeFalsy();
    });

    it('is unchecked when a todo item is made active', async () => {
      await addTodo('Todo #1');
      await addTodo('Todo #2');

      expect(await isCompleted('Todo #1')).toBeFalsy();
      expect(await isCompleted('Todo #2')).toBeFalsy();

      const markAllCompleted = await screen.findByLabelText<HTMLInputElement>(
        'Mark all as complete'
      );

      userEvent.click(markAllCompleted);

      expect(markAllCompleted).toBeChecked();
      expect(await isCompleted('Todo #1')).toBeTruthy();
      expect(await isCompleted('Todo #2')).toBeTruthy();

      userEvent.click(screen.getByLabelText('Complete Todo #1'));

      expect(markAllCompleted).not.toBeChecked();
      expect(await isCompleted('Todo #1')).toBeFalsy();
      expect(await isCompleted('Todo #2')).toBeTruthy();
    });

    it('is checked when all todo items are made complete', async () => {
      await addTodo('Todo #1');
      await addTodo('Todo #2');

      const markAllCompleted = await screen.findByLabelText<HTMLInputElement>(
        'Mark all as complete'
      );

      expect(markAllCompleted).not.toBeChecked();
      expect(await isCompleted('Todo #1')).toBeFalsy();
      expect(await isCompleted('Todo #2')).toBeFalsy();

      completeTodo('Todo #1');

      expect(markAllCompleted).not.toBeChecked();
      expect(await isCompleted('Todo #1')).toBeTruthy();
      expect(await isCompleted('Todo #2')).toBeFalsy();

      completeTodo('Todo #2');

      expect(markAllCompleted).toBeChecked();
      expect(await isCompleted('Todo #1')).toBeTruthy();
      expect(await isCompleted('Todo #2')).toBeTruthy();
    });
  });
});
