export class Todo {
  constructor(
    public readonly id: string,
    public title: string,
    public isComplete = false
  ) {}

  complete(): void {
    this.isComplete = true;
  }

  resume(): void {
    this.isComplete = false;
  }

  updateTitle(title: string): void {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) return;

    this.title = trimmedTitle;
  }
}
