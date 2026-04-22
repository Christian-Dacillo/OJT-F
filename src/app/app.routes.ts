import { Routes } from '@angular/router';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ShipStationLicenseComponent } from './ship-station-license/ship-station-license.component';

export const routes: Routes = [
  { path: '',        component: EditPageComponent },
  { path: 'license', component: ShipStationLicenseComponent },
];
