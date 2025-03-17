import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  // Simple encryption function - in a real app, use a more secure method
  encrypt(value: string): string {
    return btoa(value); // Base64 encoding
  }

  // Simple decryption function
  decrypt(value: string): string {
    return atob(value); // Base64 decoding
  }
}