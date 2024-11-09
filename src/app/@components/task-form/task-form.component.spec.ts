import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TaskService } from '../../@core/services/task.service';
import { Task } from '../../@core/interfaces';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: TaskService;
  let submitButton: DebugElement;

  const mockTaskService = {
    addTask: jasmine.createSpy('addTask').and.returnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TaskFormComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);

    fixture.detectChanges();

    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.taskForm.value).toEqual({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'pending',
    });
  });

  it('should display error messages when fields are invalid', () => {
    component.taskForm.controls['title'].markAsTouched();
    component.taskForm.controls['description'].markAsTouched();
    component.taskForm.controls['dueDate'].markAsTouched();
    fixture.detectChanges();

    const titleError = fixture.debugElement.query(
      By.css('mat-error')
    ).nativeElement;
    expect(titleError.textContent).toContain('Please enter your title');
  });

  it('should call onSubmit and emit taskUpdated when editing a task', () => {
    spyOn(component.taskUpdated, 'emit');
    const taskToEdit = {
      id: '1',
      title: 'Edit Task',
      description: 'Edit Description',
      dueDate: new Date(),
      priority: 'high',
      status: 'pending',
    };

    component.taskToEdit = taskToEdit as Task;
    component.ngOnChanges({
      taskToEdit: {
        currentValue: taskToEdit,
        firstChange: true,
        isFirstChange: () => true,
        previousValue: null,
      },
    });
    component.onSubmit();

    expect(component.taskUpdated.emit).toHaveBeenCalledWith({
      id: '1',
      title: 'Edit Task',
      description: 'Edit Description',
      dueDate: taskToEdit.dueDate,
      priority: 'high',
      status: 'pending',
    });
  });

  it('should call addTask when a new task is submitted', () => {
    component.taskForm.setValue({
      title: 'New Task',
      description: 'New Description',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'high',
      status: 'pending',
    });

    component.onSubmit();

    expect(taskService.addTask).toHaveBeenCalled();
  });

  it('should reset form after submitting a new task', () => {
    component.taskForm.setValue({
      title: 'New Task',
      description: 'New Description',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'high',
      status: 'pending',
    });

    component.onSubmit();
    expect(component.taskForm.value).toEqual({
      title: null,
      description: null,
      dueDate: null,
      priority: null,
      status: null,
    });
  });

  it('should disable submit button when form is invalid', () => {
    component.taskForm.controls['title'].setValue('');
    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.taskForm.setValue({
      title: 'Valid Title',
      description: 'Valid Description',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'high',
      status: 'pending',
    });
    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeFalse();
  });
});
