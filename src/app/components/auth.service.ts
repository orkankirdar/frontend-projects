import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = signal<{ email: string; password: string } | null>(null);
  private loggedIn = signal<boolean>(false);

  register(email: string, password: string): void {
    this.user.set({ email, password });
    this.loggedIn.set(false);
  }

  login(email: string, password: string): boolean {
    const user = this.user();
    if (user && user.email === email && user.password === password) {
      this.loggedIn.set(true);
      return true;
    }
    this.loggedIn.set(false);
    return false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  hasUser(): boolean {
    return !!this.user();
  }

  logout(): void {
    this.loggedIn.set(false);
  }
} 