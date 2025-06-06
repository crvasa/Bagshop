import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location.service';
import type { LatLng, LeafletMouseEvent } from 'leaflet';
import { Order } from '../../shared/models/Order';

@Component({
  standalone: true,
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule]
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapRef!: ElementRef;
@Input()
  order!:Order;
  private map: any;
  private currentMarker: any;
  private MARKET_ICON: any;
  private L: any; // <-- memorizza Leaflet qui

  private readonly DEFAULT_LATLNG: [number, number] = [13.75, 21.62];
  private readonly MARKET_ZOOM_LEVEL = 16;

  constructor(private locationService: LocationService) {}

  async ngOnInit(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.L = await import('leaflet'); // <-- salva il modulo importato

    this.MARKET_ICON = this.L.icon({
      iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
      iconSize: [42, 42],
      iconAnchor: [21, 42],
    });

    this.map = this.L.map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 5);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker([e.latlng.lat, e.latlng.lng]); // ✅ ora basta 1 argomento
    });
  }

  async findMyLocation(): Promise<void> {
    if (typeof window === 'undefined') return;
this.locationService.getCurrentLocation().subscribe({
  next: (latlng) => {
    console.log('Coordinate ricevute:', latlng);

    const coords: [number, number] = [latlng.lat, latlng.lng]; // ✅ ordine corretto

    this.map.setView(coords, this.MARKET_ZOOM_LEVEL);          // ✅ centratura
    this.setMarker(coords);                                    // ✅ posizione marker
  },
  error: (err) => {
    console.error('Errore durante il recupero della posizione:', err);
  }
});
  }

  setMarker(latlng: [number, number]): void {
    this.addressLatLng= latlng as unknown as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = this.L.marker(latlng, {
      draggable: true,
      icon: this.MARKET_ICON
    }).addTo(this.map);
    this.currentMarker.on('dragend', () =>{
      this.addressLatLng= this.currentMarker.getLatLng();
    })
  }
set addressLatLng(latlng: LatLng) {
  if (
    typeof latlng.lat !== 'number' ||
    typeof latlng.lng !== 'number' ||
    isNaN(latlng.lat) ||
    isNaN(latlng.lng)
  ) {
    console.warn('Coordinate non valide:', latlng);
    return;
  }

  latlng.lat = parseFloat(latlng.lat.toFixed(8));
  latlng.lng = parseFloat(latlng.lng.toFixed(8));
  this.order.addressLatLng = latlng;
  console.log('Coordinate assegnate:', this.order.addressLatLng);
}
}
