import { screen } from '@testing-library/react';
import { setupApp } from '../utils/setup-app';

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
});
