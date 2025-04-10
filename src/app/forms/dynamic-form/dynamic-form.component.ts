// src/app/forms/dynamic-form/dynamic-form.component.ts
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { Component, OnInit } from '@angular/core';

// --- Import the JSON files ---
// *** Adjust the relative path '../../' if needed ***
import schema1 from '../../../assets/forms/schema1.json'; // Changed path
import uischema1 from '../../../assets/forms/uischema1.json'; // Changed path
import schema2 from '../../../assets/forms/schema2.json'; // Changed path
import uischema2 from '../../../assets/forms/uischema2.json'; // Changed path

@Component({
  selector: 'app-dynamic-form', // This selector might be used if embedding directly
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  currentSchema: any;
  currentUiSchema: any;
  currentData: any = {}; // Holds the actual form data
  renderers = angularMaterialRenderers;
  constructor() {}

  ngOnInit(): void {
    console.log('DynamicFormComponent initialized. Loading Form 1...');
    this.loadForm1(); // Load Form 1 by default
  }

  loadForm1(): void {
    console.log('Loading Form 1 schemas...');
    this.currentSchema = schema1;
    this.currentUiSchema = uischema1;
    this.currentData = {};
    console.log('Form 1 loaded.');
  }

  loadForm2(): void {
    console.log('Loading Form 2 schemas...');
    this.currentSchema = schema2;
    this.currentUiSchema = uischema2;
    this.currentData = {};
    console.log('Form 2 loaded.');
  }

  onDataChange(data: any): void {
    this.currentData = data;
    // console.log('Form data updated:', this.currentData);
  }
}
