import { screen } from '@testing-library/react';

export async function findNewTodoInput(): Promise<HTMLInputElement> {
  return await screen.findByPlaceholderText<HTMLInputElement>(
    'What needs to be done?'
  );
}
