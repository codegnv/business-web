import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { BusinessTypeListComponent } from './components/businessType-list.component';
import { HeaderComponent } from './components/header.component';
import { IconViewComponent } from './components/icon-components/iconView.component';
import { IconDownloadComponent } from './components/icon-components/iconDownload.component';
import { IconExternalComponent } from './components/icon-components/iconExternal.component';
import { BpPermitComponent } from './components/bp-permit/bpPermit.component';

@NgModule({
    imports: [ BrowserModule, routing, FormsModule, HttpModule ],
    declarations: [ AppComponent, BusinessTypeListComponent, HeaderComponent, IconViewComponent, IconDownloadComponent,
        IconExternalComponent, BpPermitComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
