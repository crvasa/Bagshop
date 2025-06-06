import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { TextInputComponent } from '../text-input/text-input.component';
import { DefaultButtonComponent } from '../default-button/default-button.component';

import { UserService } from '../../services/user.service';
import { PasswordMatchValidator } from '../../shared/validators/password_match_validators';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';

@Component({
  standalone: true,
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TextInputComponent,
    DefaultButtonComponent
  ]
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBulder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBulder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
    }, {
      validators: PasswordMatchValidator('password', 'confirmPassword')
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }

submit() {
  this.isSubmitted = true;
  if (this.registerForm.invalid) return;

  const fv = this.registerForm.value;

  // ✂️ Non inviare confirmPassword
  const { name, email, password, address } = fv;

  this.userService.register({ name, email, password, address }).subscribe(() => {
    this.router.navigateByUrl(this.returnUrl);
  });
}

}
