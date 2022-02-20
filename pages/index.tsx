import { List } from 'immutable';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import TodoList from '../components/todo-list';
import { Filter, Toolbar } from '../components/toolbar';
import { Todo } from '../models/todo';

function normalizeFilter(filter: unknown): Filter {
  switch (filter) {
    case 'all':
    case 'active':
    case 'completed':
      return filter;
    case undefined:
      return 'all';
    default:
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

interface Props {
  setTodos: (todos: List<Todo>) => void;
  todos: List<Todo>;
}

const Home: NextPage<Props> = ({ setTodos, todos }) => {
  const router = useRouter();
  const { filter: rawFilter } = router.query;
  const filter = normalizeFilter(rawFilter);
  const filteredTodos = filterTodos(todos, filter);

  return (
    <>
      <>
        <TodoList setTodos={setTodos} todos={filteredTodos} />
        {todos.size > 0 && (
          <Toolbar activeFilter={filter} setTodos={setTodos} todos={todos} />
        )}
      </>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
};

export default Home;
