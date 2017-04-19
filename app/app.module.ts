import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { BusinessTypeListComponent } from './components/businessType-list.component';
import { StepsComponent } from './components/steps.component';
import { SearchComponent } from './components/search.component';
import { IconViewComponent } from './components/icon-components/iconView.component';
import { IconDownloadComponent } from './components/icon-components/iconDownload.component';
import { IconExternalComponent } from './components/icon-components/iconExternal.component';
import { BpPermitComponent } from './components/bp-permit/bpPermit.component';

@NgModule({
    imports: [ BrowserModule, routing, FormsModule, HttpModule ],
    declarations: [ AppComponent, BusinessTypeListComponent, SearchComponent, IconViewComponent, IconDownloadComponent,
        IconExternalComponent, BpPermitComponent, StepsComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
