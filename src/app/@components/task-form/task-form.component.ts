import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TaskService } from '../../@core/services/task.service';
import { Task } from '../../@core/interfaces';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskFormComponent {
  name: string | null = '';
  taskForm!: FormGroup;

  priorities = [
    {
      label: 'Low',
      value: 'Low',
    },
    {
      label: 'Medium',
      value: 'Medium',
    },
    {
      label: 'High',
      value: 'High',
    },
  ];

  statuses = [
    {
      label: 'Pending',
      value: 'Pending',
    },
    {
      label: 'In Progress',
      value: 'In Progress',
    },
    {
      label: 'Completed',
      value: 'Completed',
    },
  ];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.createTaskForm();
  }

  createTaskForm() {
    if (typeof sessionStorage !== 'undefined') {
      this.name = sessionStorage.getItem('name');
    }

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['medium', Validators.required],
      status: ['pending', Validators.required],
    });
  }

  get taskFormControls() {
    return this.taskForm.controls;
  }

  getErrorMessage(instance: string) {
    this.taskForm.get('title')?.updateValueAndValidity();
    if (
      instance === 'title' &&
      this.taskFormControls['title'].hasError('required')
    ) {
      return 'Please enter your title';
    } else if (
      instance === 'description' &&
      this.taskFormControls['description'].hasError('required')
    ) {
      return 'Please enter your description';
    } else if (
      instance === 'dueDate' &&
      this.taskFormControls['dueDate'].hasError('required')
    ) {
      return 'Due date is required';
    } else {
      return;
    }
  }

  onSubmit() {
    const newTask: Task = {
      id: uuidv4(), // Generates a unique ID for the new task
      ...this.taskForm.value,
    };
    this.taskService.addTask(newTask);
    this.taskForm.reset();
  }
}
