import { Record } from 'immutable';

type Props = { id: string; title: string; isComplete: boolean };

export const Todo = Record<Props>({
  id: '-1',
  isComplete: false,
  title: 'Untitled',
});

export type Todo = Record<Props> & Readonly<Props>;
