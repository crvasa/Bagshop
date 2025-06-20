import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

const VALIDATORS_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid'
};

@Component({
  selector: 'input-validation',
  standalone: true,
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css'],
  imports: [CommonModule]
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input() control!: AbstractControl;
  @Input() showErrorsWhen: boolean = true;

  errorMessages: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  checkValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
  }
}
