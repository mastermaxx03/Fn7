// src/app/forms/dynamic-form/dynamic-form.component.ts

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Import necessary modules for Reactive Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFormComponent implements OnInit {
  // Declare a FormGroup property
  myForm: FormGroup;

  // Inject FormBuilder in the constructor
  constructor(private fb: FormBuilder) {
    // Initialize the form group here or in ngOnInit
    this.myForm = this.fb.group({}); // Initialize empty
  }

  ngOnInit(): void {
    console.log(
      'DynamicFormComponent initialized. Setting up standard Angular Form...'
    );
    // Define the form structure and validation rules
    this.myForm = this.fb.group({
      // formControlName: [initialValue, [validators]]
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: [null], // No validator needed if optional, null as initial value for number
    });
    console.log('Form setup complete.');
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Submitted! Data:', this.myForm.value);
      // Here you would typically send the data to a service or API
      // alert('Form Submitted! Check the console.');
    } else {
      console.log('Form is invalid.');
      // Mark all fields as touched to display validation errors
      this.myForm.markAllAsTouched();
    }
  }

  // All JsonForms specific properties and methods are removed.
}
