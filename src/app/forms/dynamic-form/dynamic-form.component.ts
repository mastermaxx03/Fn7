import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  currentFormToShow: 'form1' | 'form2' = 'form1';
  form1: FormGroup;
  form2: FormGroup;

  private countrySubscription: Subscription | null = null;
  private ageSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder) {
    this.form1 = this.fb.group({});
    this.form2 = this.fb.group({});
  }

  ngOnInit(): void {
    this.setupForm1();
    this.setupForm2();
    this.currentFormToShow = 'form1';
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
    this.ageSubscription?.unsubscribe();
  }

  setupForm1(): void {
    this.form1 = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      confirmAgeCheck: [false],
      age: [
        { value: null, disabled: true },
        [Validators.required, Validators.min(18), Validators.max(100)],
      ],
    });

    this.ageSubscription?.unsubscribe();
    const confirmAgeControl = this.form1.get('confirmAgeCheck');
    const ageControl = this.form1.get('age');
    if (confirmAgeControl && ageControl) {
      if (!confirmAgeControl.value) {
        ageControl.disable();
        ageControl.clearValidators();
      } else {
        ageControl.enable();
        ageControl.setValidators([
          Validators.required,
          Validators.min(18),
          Validators.max(100),
        ]);
      }
      ageControl.updateValueAndValidity();
      this.ageSubscription = confirmAgeControl.valueChanges.subscribe(
        (isChecked) => {
          if (isChecked) {
            ageControl.enable();
            ageControl.setValidators([
              Validators.required,
              Validators.min(18),
              Validators.max(100),
            ]);
          } else {
            ageControl.disable();
            ageControl.clearValidators();
            ageControl.reset(null);
          }
          ageControl.updateValueAndValidity();
        }
      );
    }
  }

  setupForm2(): void {
    this.form2 = this.fb.group({
      bookingDate: ['', Validators.required],
      subscribeNewsletter: [true],
      country: ['', Validators.required],
      feedback: [''],
      otherCountry: [{ value: '', disabled: true }],
    });

    this.countrySubscription?.unsubscribe();
    const countryControl = this.form2.get('country');
    const otherCountryControl = this.form2.get('otherCountry');

    if (countryControl && otherCountryControl) {
      if (countryControl.value !== 'Other') {
        otherCountryControl.disable();
        otherCountryControl.clearValidators();
      } else {
        otherCountryControl.enable();
        otherCountryControl.setValidators(Validators.required);
      }
      otherCountryControl.updateValueAndValidity();

      this.countrySubscription = countryControl.valueChanges.subscribe(
        (countryValue) => {
          if (countryValue === 'Other') {
            otherCountryControl.enable();
            otherCountryControl.setValidators(Validators.required);
          } else {
            otherCountryControl.disable();
            otherCountryControl.clearValidators();
            otherCountryControl.reset('');
          }
          otherCountryControl.updateValueAndValidity();
        }
      );
    }
  }

  loadForm1(): void {
    this.currentFormToShow = 'form1';
  }

  loadForm2(): void {
    this.currentFormToShow = 'form2';
  }

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
    } else {
      console.log(`Form ${this.currentFormToShow} is invalid.`);
      activeForm.markAllAsTouched();
    }
  }

  get currentFormData(): any {
    return this.currentFormToShow === 'form1'
      ? this.form1.value
      : this.form2.value;
  }

  get currentFormValidity(): boolean {
    return this.currentFormToShow === 'form1'
      ? this.form1.valid
      : this.form2.valid;
  }
}
