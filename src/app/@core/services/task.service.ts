import { Injectable } from '@angular/core';
import { Task } from '../interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksKey = 'tasks';
  private tasksSubject = new BehaviorSubject<Task[]>(this.getTasks());
  tasks$ = this.tasksSubject.asObservable();

  private getTasks(): Task[] {
    return JSON.parse(localStorage.getItem(this.tasksKey) || '[]');
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    this.tasksSubject.next(tasks); // Emit the new tasks list
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks().map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveTasks(tasks);
  }

  deleteTask(id: string): void {
    const tasks = this.getTasks().filter((task) => task.id !== id);
    this.saveTasks(tasks);
  }
}
