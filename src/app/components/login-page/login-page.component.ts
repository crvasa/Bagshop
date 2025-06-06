import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user.service';
import { TextInputComponent } from '../text-input/text-input.component';
import { DefaultButtonComponent } from '../default-button/default-button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TextInputComponent,
    DefaultButtonComponent
  ]
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.activateRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit(): void {
  this.isSubmitted = true;
  if (this.loginForm.invalid) return;

  this.userService.login({
    email: this.fc.email.value,
    password: this.fc.password.value
  }).subscribe({
    next: () => {
      const target = this.returnUrl || '/';
      this.router.navigateByUrl(target);
    },
    error: () => {
      // gestito già dal servizio
    }
  });
}

}
