import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsTableComponent } from './pets-table/pets-table.component';

const routes: Routes = [
  { path: 'pets-table', component: PetsTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
