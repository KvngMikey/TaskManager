import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    // MatFormFieldModule,
    // MatInputModule,
    // MatRippleModule,
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
    sessionStorage.setItem('userName', name); // Save userName to sessionStorage
    this.router.navigate(['/tasks']);
  }
}
