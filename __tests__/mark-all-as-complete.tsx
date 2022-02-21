import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupApp } from '../utils/setup-app';
import { addTodo } from '../utils/add-todo';
import { isCompleted } from '../utils/is-completed';
import { completeTodo } from '../utils/complete-todo';

describe('TodoMVC App Spec', () => {
  beforeEach(async () => {
    await setupApp();
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
