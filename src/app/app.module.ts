// src/app/app.module.ts

// Imports are already here - good!
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent, // Correctly declared
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // --- ADDED MODULES HERE ---
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    BrowserAnimationsModule,
    // --- END ADDED MODULES ---
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
