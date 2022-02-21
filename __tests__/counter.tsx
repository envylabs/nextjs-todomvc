import { screen } from '@testing-library/react';
import { setupApp } from '../utils/setup-app';
import { addTodo } from '../utils/add-todo';
import { completeTodo } from '../utils/complete-todo';

function itemCount(): string {
  const COUNT_REGEX = /^(\d+) items? left$/;
  const countElement = screen.getByText((content, element) => {
    return content !== '' && COUNT_REGEX.test(element?.textContent || '');
  });

  if (!countElement || !countElement.textContent) {
    throw new Error('Could not find the count element');
  }

  return countElement.textContent;
}

describe('TodoMVC App Spec', () => {
  beforeEach(async () => {
    await setupApp();
  });

  describe('Counter', () => {
    it('correctly pluralizes active item count', async () => {
      await addTodo('Todo #1');

      expect(itemCount()).toEqual('1 item left');

      await addTodo('Todo #2');

      expect(itemCount()).toEqual('2 items left');

      completeTodo('Todo #2');

      expect(itemCount()).toEqual('1 item left');

      completeTodo('Todo #1');

      expect(itemCount()).toEqual('0 items left');
    });
  });
});
