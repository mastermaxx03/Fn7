// src/app/shared/styled-input/styled-input.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-styled-input', // Matches the tag used in HTML (<app-styled-input>)
  templateUrl: './styled-input.component.html',
  styleUrls: ['./styled-input.component.scss'],
  // Provider to connect this component to Angular's form system
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StyledInputComponent),
      multi: true,
    },
  ],
})
// Implement the ControlValueAccessor interface
export class StyledInputComponent implements ControlValueAccessor {
  // --- Inputs for configuration ---
  @Input() label: string = '';
  @Input() type: string = 'text'; // Default to text input
  @Input() placeholder: string = '';

  // --- ControlValueAccessor methods (will fill these later) ---
  onChange: any = () => {}; // Callback function to notify Angular of changes
  onTouched: any = () => {}; // Callback function to notify Angular when touched

  value: any = ''; // Internal value of the input
  isDisabled: boolean = false;

  // Called by Angular forms to write value into component
  writeValue(value: any): void {
    this.value = value;
  }

  // Called by Angular forms to register callback for value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Called by Angular forms to register callback for touch events
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Called by Angular forms to set the disabled state
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // --- Method to handle input changes from the template ---
  // We will connect this to the <input> element in the HTML
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value; // Update internal value
    this.onChange(this.value); // Notify Angular forms
    this.onTouched(); // Mark as touched
  }
}
