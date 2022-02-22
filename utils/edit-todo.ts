import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export async function editTodo(title: string, newTitle: string): Promise<void> {
  userEvent.dblClick(screen.getByText(title));

  const editInput = await screen.findByLabelText<HTMLInputElement>(
    `Edit ${title}`
  );

  editInput.setSelectionRange(0, editInput.value.length);
  await userEvent.type(editInput, newTitle, {
    initialSelectionStart: 0,
    initialSelectionEnd: editInput.value.length,
  });
}
