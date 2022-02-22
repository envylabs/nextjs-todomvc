import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function completeTodo(title: string): void {
  userEvent.click(screen.getByLabelText(`Complete ${title}`));
}
