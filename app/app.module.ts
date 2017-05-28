import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { StepsModule } from './components/steps/steps.module';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { BusinessTypeListComponent } from './components/businessType-list.component';
import { SearchComponent } from './components/search.component';
import { IconViewComponent } from './components/icon-components/iconView.component';
import { IconDownloadComponent } from './components/icon-components/iconDownload.component';
import { IconExternalComponent } from './components/icon-components/iconExternal.component';
import { BpPermitComponent } from './components/bp-permit/bpPermit.component';
import { LandingComponent } from './components/landing/landing.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';

@NgModule({
    imports: [ BrowserModule, routing, FormsModule, HttpModule, NgbModule, StepsModule ],
    declarations: [
        AppComponent, BusinessTypeListComponent, SearchComponent, IconViewComponent, IconDownloadComponent,
        IconExternalComponent, BpPermitComponent, LandingComponent, ContactComponent,
        AboutComponent, DisclaimerComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
