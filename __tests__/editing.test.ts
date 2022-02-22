import { screen } from '@testing-library/react';
import { setupApp } from '../utils/setup-app';
import { addTodo } from '../utils/add-todo';
import userEvent from '@testing-library/user-event';
import { editTodo } from '../utils/edit-todo';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('TodoMVC App Spec', () => {
  beforeEach(async () => {
    await setupApp();
  });

  describe('Editing', () => {
    it('edits a todo by double-clicking its title', async () => {
      await addTodo('Todo #1');

      expect(screen.queryByLabelText('Edit Todo #1')).not.toBeInTheDocument();

      userEvent.dblClick(screen.getByText('Todo #1'));

      expect(screen.getByLabelText('Edit Todo #1')).toBeInTheDocument();
    });

    it('focuses on the todo title input when editing', async () => {
      await addTodo('Todo #1');

      userEvent.dblClick(screen.getByText('Todo #1'));

      expect(screen.getByLabelText('Edit Todo #1')).toHaveFocus();
    });

    it('changes a todo title with ENTER', async () => {
      await addTodo('Todo #1');

      expect(screen.queryByText('Todo #1 Edited')).not.toBeInTheDocument();

      userEvent.dblClick(screen.getByText('Todo #1'));

      const editInput = await screen.findByLabelText<HTMLInputElement>(
        'Edit Todo #1'
      );

      await userEvent.type(editInput, ' Edited{enter}');

      expect(screen.getByText('Todo #1 Edited')).toBeInTheDocument();
    });

    it('changes a todo title when blurred', async () => {
      await addTodo('Todo #1');

      expect(screen.queryByText('Todo #1 Edited')).not.toBeInTheDocument();

      userEvent.dblClick(screen.getByText('Todo #1'));

      const editInput = await screen.findByLabelText<HTMLInputElement>(
        'Edit Todo #1'
      );

      await userEvent.type(editInput, ' Edited');

      expect(screen.queryByText('Todo #1 Edited')).not.toBeInTheDocument();

      await userEvent.tab();

      expect(screen.getByText('Todo #1 Edited')).toBeInTheDocument();
    });

    it('removes empty todos after editing', async () => {
      await addTodo('Todo #1');
      await editTodo('Todo #1', ' \t {enter}');

      expect(screen.queryByText('Todo #1')).not.toBeInTheDocument();
      expect(screen.queryByText(' \t ')).not.toBeInTheDocument();
    });

    it('ignores and resets an edit on ESCAPE', async () => {
      await addTodo('Todo #1');
      await editTodo('Todo #1', ' \t {escape}');

      expect(screen.queryByLabelText('Edit Todo #1')).not.toBeInTheDocument();
      expect(screen.getByText('Todo #1')).toBeInTheDocument();
    });
  });
});
