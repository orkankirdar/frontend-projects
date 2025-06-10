import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordValidator]],
    confirmPassword: ['', [Validators.required]]
  });

  registerSuccess = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`]/.test(value);
    const isValidLength = value.length >= 6;
    const valid = hasUpperCase && hasSpecialChar && isValidLength;
    return valid ? null : { passwordStrength: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  onSubmit(): void {
    if (this.registerForm.valid && this.passwordsMatch) {
      const { email, password } = this.registerForm.value as { email: string; password: string };
      this.auth.register(email, password);
      this.registerSuccess.set(true);
      setTimeout(() => {
        this.registerSuccess.set(false);
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      }, 1500);
    }
  }

  get passwordsMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }
} 