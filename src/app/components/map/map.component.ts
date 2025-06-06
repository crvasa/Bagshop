import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location.service';
import type { LatLng, LeafletMouseEvent, Map as LeafletMap, Marker } from 'leaflet';
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
  @Input() order!: Order;

  private map!: LeafletMap;
  private currentMarker!: Marker;
  private MARKET_ICON: any;
  private L: any;

  private readonly DEFAULT_LATLNG: [number, number] = [13.75, 21.62];
  private readonly MARKET_ZOOM_LEVEL = 16;

  constructor(private locationService: LocationService) {}

  async ngOnInit(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.L = await import('leaflet');

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
      this.setMarker([e.latlng.lat, e.latlng.lng]);
    });
  }

  async findMyLocation(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        const coords: [number, number] = [latlng.lat, latlng.lng];
        this.map.setView(coords, this.MARKET_ZOOM_LEVEL);
        this.setMarker(coords);
      },
      error: (err) => {
        console.error('Errore durante il recupero della posizione:', err);
      }
    });
  }

  setMarker(latlng: [number, number]): void {
    const formattedLatLng = this.L.latLng(
      parseFloat(latlng[0].toFixed(8)),
      parseFloat(latlng[1].toFixed(8))
    );
    this.order.addressLatLng = formattedLatLng;

    if (this.currentMarker) {
      this.currentMarker.setLatLng(formattedLatLng);
      return;
    }

    this.currentMarker = this.L.marker(formattedLatLng, {
      draggable: true,
      icon: this.MARKET_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      const newLatLng = this.currentMarker.getLatLng();
      this.order.addressLatLng = this.L.latLng(
        parseFloat(newLatLng.lat.toFixed(8)),
        parseFloat(newLatLng.lng.toFixed(8))
      );
    });
  }
}
