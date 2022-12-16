import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import { debounceTime, pipe, throttle } from 'rxjs';
import { MapService } from './map.service';

@Component({
  selector: 'lib-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.style.sass'],
})
export class MapComponent implements AfterViewInit, OnInit {
  zoomFlag: boolean;
  private map: any;
  @ViewChild('mapFrame') mapFrame!: ElementRef<HTMLElement>;

  constructor(public markerService: MapService) {}

  ngOnInit(): void {
    this.markerService.zoomMap.subscribe((d: boolean) => {
      this.zoomFlag = d;
    });
  }

  selectLocationListener() {
    this.map.on('click', (e: any) => {
      if (this.markerService.zoomMap) {
        this.markerService.createAsyncSubject();
        this.ngOnInit();
        this.markerService.selectedLocation.next([e.latlng.lat, e.latlng.lng]);
        this.markerService.drawMarker([e.latlng.lat, e.latlng.lng], this.map);
      }
      this.map.panTo([e.latlng.lat, e.latlng.lng]);
    });
  }

  private initializeMap(): void {
    this.map = L.map('map', {
      center: [1, 100],
      zoom: 10,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 10,
      }
    );
    tiles.addTo(this.map);
  }

  toggle() {
    this.markerService.zoomMap.next(false);
    this.zoomFlag = !this.zoomFlag;
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.selectLocationListener();
    this.markerService.makeSomeMarkers(this.map);
  }
}
