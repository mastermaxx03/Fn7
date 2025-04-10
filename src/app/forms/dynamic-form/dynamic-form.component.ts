import { Component, OnInit } from '@angular/core';
// Import necessary modules for Reactive Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// --- We no longer need imports for JsonForms schemas or renderers ---

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  // Variable to control which form is displayed
  currentFormToShow: 'form1' | 'form2' = 'form1';

  // FormGroup definitions for BOTH forms
  form1: FormGroup;
  form2: FormGroup;

  // Inject FormBuilder
  constructor(private fb: FormBuilder) {
    // Initialize empty forms initially
    this.form1 = this.fb.group({});
    this.form2 = this.fb.group({});
  }

  ngOnInit(): void {
    console.log(
      'DynamicFormComponent initialized. Setting up standard Angular Forms...'
    );
    this.setupForm1();
    this.setupForm2();
    // Ensure Form 1 is shown initially
    this.currentFormToShow = 'form1';
    console.log('Forms setup complete.');
  }

  // Method to set up Form 1 structure (based on schema1.json)
  setupForm1(): void {
    this.form1 = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.min(18), Validators.max(100)]],
    });
  }

  // Method to set up Form 2 structure (based on schema2.json)
  setupForm2(): void {
    this.form2 = this.fb.group({
      bookingDate: ['', Validators.required],
      subscribeNewsletter: [true], // Default value true
      country: ['', Validators.required],
      feedback: [''],
    });
  }

  // --- Methods to switch which form is shown ---
  loadForm1(): void {
    console.log('Switching to display Form 1');
    this.currentFormToShow = 'form1';
  }

  loadForm2(): void {
    console.log('Switching to display Form 2');
    this.currentFormToShow = 'form2';
  }

  // Method to handle form submission (needs to check which form is active)
  onSubmit(): void {
    let activeForm: FormGroup;
    let formData: any;

    if (this.currentFormToShow === 'form1') {
      activeForm = this.form1;
    } else {
      activeForm = this.form2;
    }

    if (activeForm.valid) {
      formData = activeForm.value;
      console.log(`Form ${this.currentFormToShow} Submitted! Data:`, formData);
      // alert(`Form ${this.currentFormToShow} Submitted! Check the console.`);
    } else {
      console.log(`Form ${this.currentFormToShow} is invalid.`);
      activeForm.markAllAsTouched(); // Mark fields to show errors
    }
  }
}
