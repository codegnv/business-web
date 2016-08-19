import { Component, OnInit } from '@angular/core';
import { BusinessType } from './businessType';
import { BusinessTypeService } from './businessTypes.service';

@Component({
  selector: 'businesstype-list',
  template: `
  <section>
    <section *ngIf="isLoading && !errorMessage">
    Loading our hyperdrives!!! Retrieving data...
    </section>
      <ul>
        <!-- this is the new syntax for ng-repeat -->
        <li *ngFor="let businesstype of businesstypes">
          {{businesstype.business_type}}
        </li>
      </ul>
      <section *ngIf="errorMessage">
        {{errorMessage}}
      </section>
  </section>
  `
})
export class BusinessTypeListComponent implements OnInit {
  businesstypes: BusinessType[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private businessTypesService: BusinessTypeService) {}

  ngOnInit() {
    this.businessTypesService
      .getAll()
      .subscribe(
         /* happy path */ b => this.businesstypes = b,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */ () => this.isLoading = false);
  }
}
