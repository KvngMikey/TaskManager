import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { of } from 'rxjs';
import { Task } from '../../@core/interfaces';
import { TaskService } from '../../@core/services/task.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', [
      'tasks$',
      'deleteTask',
      'updateTask',
    ]);
    mockTaskService.tasks$ = of([
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        dueDate: new Date(),
        priority: 'high',
        status: 'pending',
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        dueDate: new Date(),
        priority: 'medium',
        status: 'completed',
      },
    ] as Task[]);

    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks and call filterTasks', () => {
    spyOn(component, 'filterTasks');
    component.loadTasks();
    expect(component.tasks.length).toBe(2);
    expect(component.filterTasks).toHaveBeenCalled();
  });

  it('should filter tasks based on selected status and priority', () => {
    component.selectedStatus = 'pending';
    component.selectedPriority = 'high';
    component.filterTasks();
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Task 1');
  });

  it('should set selectedTask on editTask call', () => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      dueDate: new Date(),
      priority: 'high',
      status: 'pending',
    };
    component.editTask(task);
    expect(component.selectedTask).toEqual(task);
  });

  it('should delete task and reload tasks on deleteTask call', () => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      dueDate: new Date(),
      priority: 'high',
      status: 'pending',
    };
    spyOn(component, 'loadTasks');
    component.deleteTask(task);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(task.id);
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it('should update task and reset selectedTask on onTaskUpdated call', () => {
    const updatedTask: Task = {
      id: '1',
      title: 'Updated Task',
      description: 'Updated Description',
      dueDate: new Date(),
      priority: 'medium',
      status: 'completed',
    };
    component.onTaskUpdated(updatedTask);
    expect(mockTaskService.updateTask).toHaveBeenCalledWith(updatedTask);
    expect(component.selectedTask).toBeUndefined();
  });
});
