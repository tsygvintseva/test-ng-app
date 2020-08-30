import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PetsTableComponent } from './pets-table/pets-table.component';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './modal/modal.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PetsTableComponent,
    IndexComponent,
    ModalComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
