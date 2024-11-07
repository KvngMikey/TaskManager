import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../../@core/services/task.service';
import { Subscription } from 'rxjs';
import { Task } from '../../@core/interfaces';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.subscription.add(
        this.taskService.tasks$.subscribe((tasks) => {
          this.tasks = tasks;
        })
      ) 
      this.cdr.detectChanges();
    }
  }

  editTask(task: Task): void {
    this.taskService.updateTask(task);
    this.loadTasks();
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
    this.loadTasks();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
