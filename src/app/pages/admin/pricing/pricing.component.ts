import { Component } from '@angular/core';
import { PricingData, PricingService } from '../../../services/pricing.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  imports: [
    CommonModule,
     FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        HeaderComponent
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  pricing: PricingData = {
    price_duo: 0,
    price_trio: 0,
    price_group: 0
  };

  tempPricing: PricingData = {
    price_duo: 0,
    price_trio: 0,
    price_group: 0
  };

  editingField = {
    price_duo: false,
    price_trio: false,
    price_group: false
  };

  saveSuccess = false;

  constructor(private pricingService: PricingService) {}

  async ngOnInit() {
    this.pricing = await this.pricingService.getPricing();
    this.tempPricing = { ...this.pricing };
  }

  startEditing(field: keyof PricingData) {
    this.editingField[field] = true;
    this.tempPricing[field] = this.pricing[field];
  }

  async confirmEdit(field: keyof PricingData) {
    this.pricing[field] = this.tempPricing[field];
    this.editingField[field] = false;
    
    try {
      await this.pricingService.savePricing(this.pricing);
      this.saveSuccess = true;
      setTimeout(() => {
        this.saveSuccess = false;
      }, 3000);
    } catch (error) {
      console.error('Error saving pricing:', error);
    }
  }

  cancelEdit(field: keyof PricingData) {
    this.tempPricing[field] = this.pricing[field];
    this.editingField[field] = false;
  }
}
