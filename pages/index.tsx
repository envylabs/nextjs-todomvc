import { List } from 'immutable';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '../components/layout';
import TodoList from '../components/todo-list';
import { Filter, Toolbar } from '../components/toolbar';
import { Todo } from '../models/todo';
import { loadMessages } from '../utils/load-messages';

import { DefaultProps } from './_app';

function normalizeFilter(filter: unknown): Filter {
  switch (filter) {
    case 'all':
    case 'active':
    case 'completed':
      return filter;
    case undefined:
      return 'all';
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unexpected filter type: ${filter}`);
  }
}

function filterTodos(todos: List<Todo>, filter: Filter): List<Todo> {
  switch (filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.filterNot((todo) => todo.isComplete);
    case 'completed':
      return todos.filter((todo) => todo.isComplete);
  }
}

const Home: NextPage<DefaultProps> = ({ setTodos, todos }) => {
  const router = useRouter();
  const { filter: rawFilter } = router.query;
  const filter = normalizeFilter(rawFilter);
  const filteredTodos = filterTodos(todos, filter);

  return (
    <Layout setTodos={setTodos} todos={todos}>
      <TodoList setTodos={setTodos} todos={filteredTodos} />
      {todos.size > 0 && (
        <Toolbar
          activeFilter={filter}
          activeTodos={filterTodos(todos, 'active')}
          setTodos={setTodos}
          todos={todos}
        />
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
};

export default Home;
