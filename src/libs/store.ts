import { Task } from "../types";

const tasks: Task[] = [];

export const store = {
  getAll: () => tasks,

  create: (title: string): Task => {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    tasks.push(task);
    return task;
  },

  update: (id: string, completed: boolean): Task | null => {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;

    task.completed = completed;
    return task;
  },
};