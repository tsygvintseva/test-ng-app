import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { PetsTableComponent } from './pets-table/pets-table.component';


const routes: Routes = [
  { path: '',  redirectTo: '/index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent },
  { path: 'pets-table', component: PetsTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
