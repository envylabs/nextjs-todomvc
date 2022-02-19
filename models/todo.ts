export class Todo {
  constructor(public title: string, public isComplete = false) {}

  complete(): void {
    this.isComplete = true;
  }

  resume(): void {
    this.isComplete = false;
  }
}
