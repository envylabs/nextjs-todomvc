import { Todo } from './todo';

export class Store {
  constructor(private todos: Todo[] = []) {}

  add(title: string, isComplete = false): void {
    const todo = new Todo(title, isComplete);
    this.todos.push(todo);
  }

  all(): Todo[] {
    return [...this.todos];
  }

  completeAll(): void {
    this.todos.forEach((todo) => todo.complete());
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
}
