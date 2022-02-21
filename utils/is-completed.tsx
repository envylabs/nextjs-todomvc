import { screen } from '@testing-library/react';

export async function isCompleted(title: string): Promise<boolean> {
  const todoCompleted = await screen.findByLabelText<HTMLInputElement>(
    `Complete ${title}`
  );

  return todoCompleted.checked;
}
