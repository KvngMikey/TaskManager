import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomeComponent implements OnInit {
  welcomeForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createWelcomeForm();
  }

  createWelcomeForm() {
    this.welcomeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  get welcomeFormControls() {
    return this.welcomeForm.controls;
  }

  submitForm() {
    const name = this.welcomeForm.value.name;
    sessionStorage.setItem('userName', name);
    this.router.navigate(['/tasks']);
  }
}
