import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { AsyncSubject, BehaviorSubject, delay, Subject } from 'rxjs';
import { LocalStorageService } from 'src/app/services/localstorage';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  zoomMap = new Subject<boolean>();
  selectedLocation = new AsyncSubject();

  capitals: string = '/assets/data/usa-capitals.geojson';
  marker: any = [1000, 1000];
  Icon = L.icon({
    iconUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [44, 44],
    shadowSize: [25, 25],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });

  constructor(
    private http: HttpClient,
    private localstorage: LocalStorageService
  ) {
    this.zoomMap.next(false);
  }

  createPopup(c: any, location) {
    let divParent = document.createElement('div');
    let div1 = document.createElement('div');
    div1.innerHTML = 'Location Details';
    div1.className = 'bg-light-dark';
    div1.className = 'm-3';

    let div2 = document.createElement('div');
    div2.innerHTML =
      '<strong>X=</strong>' +
      location[0] +
      '<br><strong>Y=</strong>' +
      location[1];
    div2.className = 'm-3';

    let div3 = document.createElement('div');
    div3.className = 'm-3';
    let span1 = document.createElement('span');
    let btnClose = document.createElement('button');
    btnClose.innerText = 'Close';
    btnClose.className = 'btn btn-warning m-2';
    btnClose.onclick = function () {
      c.zoomMap.next(false);
    };

    span1.appendChild(btnClose);
    div3.appendChild(span1);

    let span2 = document.createElement('span');
    let btnEdit = document.createElement('button');
    btnEdit.innerText = 'Edit';
    btnEdit.className = 'btn btn-primary m-2';
    btnEdit.onclick = function () {
      c.zoomMap.next(false);
      c.selectedLocation.complete();
    };
    span2.appendChild(btnEdit);
    div3.appendChild(span2);

    divParent.appendChild(div1);
    divParent.appendChild(div2);
    divParent.appendChild(div3);
    return divParent;
  }

  createAsyncSubject() {
    this.selectedLocation = new AsyncSubject();
  }

  drawMarker(loc: any, map: any) {
    map.removeLayer(this.marker);
    this.marker = new L.Marker(loc, { icon: this.Icon, draggable: true });
    map.addLayer(this.marker);
    this.marker.bindPopup(this.createPopup(this, loc)).openPopup();
  }

  makeSomeMarkers(map: any): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);
        marker.addTo(map);
      }
    });
  }
}
