import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Banner } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private eventsCollection;

  constructor(private firestore: Firestore) { 
    this.eventsCollection = collection(this.firestore, 'Events');
  }

  getBanners(): Observable<Banner[]> {
    return collectionData(this.eventsCollection, { idField: 'id' }) as Observable<Banner[]>;
  }

  getBanner(id: string): Observable<Banner> {
    const bannerDoc = doc(this.firestore, `Events/${id}`);
    return docData(bannerDoc, { idField: 'id' }) as Observable<Banner>;
  }

  createBanner(banner: Banner): Observable<string> {
    return from(addDoc(this.eventsCollection, banner)).pipe(
      map(docRef => docRef.id)
    );
  }

  updateBanner(id: string, banner: Partial<Banner>): Observable<void> {
    const bannerDoc = doc(this.firestore, `Events/${id}`);
    return from(updateDoc(bannerDoc, banner));
  }

  deleteBanner(id: string): Observable<void> {
    const bannerDoc = doc(this.firestore, `Events/${id}`);
    return from(deleteDoc(bannerDoc));
  }
}