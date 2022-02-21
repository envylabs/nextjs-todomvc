import userEvent from '@testing-library/user-event';
import { findNewTodoInput } from './find-new-todo-input';

export async function addTodo(title: string): Promise<void> {
  const newTodoInput = await findNewTodoInput();
  await userEvent.type(newTodoInput, `${title}{enter}`);
}
