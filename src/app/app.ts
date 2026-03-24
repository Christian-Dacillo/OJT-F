import { Component } from '@angular/core';
import { ShipStationLicenseComponent } from './ship-station-license/ship-station-license.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShipStationLicenseComponent],
  template: `<app-ship-station-license></app-ship-station-license>`
})
export class App {}
