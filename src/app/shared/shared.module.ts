import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materialAngular/material';
import { MapaComponent } from './components/mapa/mapa.component';
// Map
import { AgmCoreModule } from '@agm/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [MapaComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4mDSQUc77PX08_UlFSea_VbiYRCfd1A8'
    })
  ]
})
export class SharedModule { }
