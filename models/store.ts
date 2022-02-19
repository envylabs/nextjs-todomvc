import { Todo } from './todo';

let id = 0;

export class Store {
  constructor(private todos: Todo[] = []) {}

  add(title: string, isComplete = false): void {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) return;

    const todo = this.create(trimmedTitle, isComplete);
    this.todos.push(todo);
  }

  all(): Todo[] {
    return this.todos;
  }

  completeAll(): void {
    this.todos.forEach((todo) => todo.complete());
  }

  private create(title: string, isComplete = false): Todo {
    return new Todo((++id).toString(), title, isComplete);
  }

  get completed(): Todo[] {
    return this.todos.filter((todo) => todo.isComplete);
  }

  get isEmpty(): boolean {
    return this.todos.length === 0;
  }

  remove(todo: Todo): void {
    this.todos = this.todos.filter((todo) => todo !== todo);
  }

  update(todo: Todo, properties: Partial<Todo>) {
    todo.title = properties.title || todo.title;
    todo.isComplete = properties.isComplete || todo.isComplete;
  }
}
