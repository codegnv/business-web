import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routes';

import { AppComponent }  from './app.component';
import { BusinessTypeListComponent } from './businessType-list.component';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [ BrowserModule, routing, FormsModule, HttpModule],
  declarations: [ AppComponent, BusinessTypeListComponent, HeaderComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
