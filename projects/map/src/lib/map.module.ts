import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MapComponent],
  imports: [HttpClientModule, CommonModule],
  exports: [MapComponent],
})
export class MapModule {}
