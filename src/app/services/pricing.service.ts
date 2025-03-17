import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore';

export interface PricingData {
  price_duo: number;
  price_trio: number;
  price_group: number;
}

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  constructor(private firestore: Firestore) {}

  async savePricing(pricing: PricingData): Promise<void> {
    const docRef = doc(this.firestore, 'settings', 'pricing');
    await setDoc(docRef, pricing);
  }

  async getPricing(): Promise<PricingData> {
    const docRef = doc(this.firestore, 'settings', 'pricing');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as PricingData;
    }
    
    return {
      price_duo: 0,
      price_trio: 0,
      price_group: 0
    };
  }
}