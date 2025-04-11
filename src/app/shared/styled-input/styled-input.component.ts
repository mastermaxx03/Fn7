import { Component, Input, forwardRef, Injector, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-styled-input',
  templateUrl: './styled-input.component.html',
  styleUrls: ['./styled-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StyledInputComponent),
      multi: true,
    },
  ],
})
export class StyledInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  value: any = '';
  isDisabled: boolean = false;

  control: AbstractControl | null = null;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl) {
      this.control = ngControl.control;
      // --- ADD THIS LINE ---
      console.log('StyledInputComponent found control:', this.control);
      // ---------------------
    } else {
      console.error(
        'StyledInputComponent requires being used with formControlName or ngModel'
      );
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
