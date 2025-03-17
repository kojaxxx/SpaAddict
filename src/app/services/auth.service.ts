import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from './encryption.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor(
    private router: Router,
    private encryptionService: EncryptionService
  ) {
    // Check if the user is already logged in (from session storage)
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  }

  login(username: string, password: string): boolean {
    const encryptedUsername = this.encryptionService.encrypt(username);
    const encryptedPassword = this.encryptionService.encrypt(password);

    if (encryptedUsername === environment.admin.encryptedUsername && 
        encryptedPassword === environment.admin.encryptedPassword) {
      this.isLoggedIn = true;
      sessionStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}