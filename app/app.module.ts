import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { PeopleListComponent } from './people-list.component';
import { BusinessTypeListComponent } from './businessType-list.component';
import { PersonDetailsComponent } from './person-details.component';

@NgModule({
  imports: [ BrowserModule, routing, FormsModule, HttpModule],
  declarations: [ AppComponent, PeopleListComponent, PersonDetailsComponent, BusinessTypeListComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
