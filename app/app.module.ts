import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { BusinessTypeListComponent } from './components/businessType-list.component';
import { HeaderComponent } from './components/header.component';

@NgModule({
    imports: [ BrowserModule, routing, FormsModule, HttpModule ],
    declarations: [ AppComponent, BusinessTypeListComponent, HeaderComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
