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
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, MatMenuModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  selectedTask?: Task;
  selectedStatus: string = '';
  selectedPriority: string = '';
  filteredTasks: Task[] = [];
  statusOptions: string[] = ['Pending', 'In Progress', 'Completed'];
  priorityOptions: string[] = ['Low', 'Medium', 'High'];

  private subscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.subscription.add(
        this.taskService.tasks$.subscribe((tasks) => {
          this.tasks = tasks;
          this.filterTasks();
        })
      );
      this.cdr.detectChanges();
    }
  }

  editTask(task: Task): void {
    this.selectedTask = task;
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
    this.loadTasks();
  }

  onTaskUpdated(updatedTask: Task) {
    this.taskService.updateTask(updatedTask);
    this.selectedTask = undefined; // Reset selected task after edit
    this.loadTasks();
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const statusMatch = this.selectedStatus
        ? task.status === this.selectedStatus
        : true;
      const priorityMatch = this.selectedPriority
        ? task.priority === this.selectedPriority
        : true;
      return statusMatch && priorityMatch;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
