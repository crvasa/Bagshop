import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() {}

  getCurrentLocation(): Observable<{ lat: number; lng: number }> {
    return new Observable((observer) => {
      if (typeof window === 'undefined' || !navigator.geolocation) {
        observer.error('Geolocalizzazione non disponibile.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          observer.complete();
        },
        (error) => {
          observer.error('Errore nel recupero della posizione.');
        }
      );
    });
  }
}
