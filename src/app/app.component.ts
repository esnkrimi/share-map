import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapService } from 'projects/map/src/public-api';
import { LocalStorageService } from './services/localstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  information = '';
  msg = '';
  cancel = false;
  @ViewChild('file') file!: ElementRef<HTMLElement>;

  constructor(
    private localstorage: LocalStorageService,
    private mapService: MapService
  ) {}

  fileClick() {
    let el: HTMLElement = this.file.nativeElement;
    el.click();
  }
  fields = [
    {
      name: 'locationName',
      title: 'Location Name',
      type: 'input',
    },
    {
      name: 'locationOnMap',
      title: 'Location on Map',
      type: 'map',
    },
    {
      name: 'locationType',
      title: 'Location type',
      type: 'select',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'file',
    },
  ];
  form: any = new FormGroup({
    locationName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    locationOnMapX: new FormControl(''),
    locationOnMapY: new FormControl(''),
    locationType: new FormControl(''),
    logo: new FormControl(''),
  });

  onSubmit() {
    this.mapService.selectedLocation.subscribe((res: any) => {
      this.form.controls['locationOnMapX'].setValue(res[0]);
      this.form.controls['locationOnMapY'].setValue(res[1]);
    });
    this.localstorage.setItem('info', this.form.value);
    this.msg = 'Saved Form In LocalStorage';
  }
  cancelSharing() {
    this.cancel = true;
  }
  retrieveLocalStorage() {
    this.information = this.localstorage.getItem('info');
  }
}
