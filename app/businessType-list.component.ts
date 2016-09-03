import { Component, OnInit } from '@angular/core';
import { BusinessType } from './businessType';
import { BusinessTypeService } from './businessTypes.service';
import { BusinessCategory } from './businessCategory';

@Component({
  selector: 'businesstype-list',
  template: `
  <section>
    <section *ngIf="isLoading && !errorMessage">
    Retrieving data from data.cityofgainesville.org...
    </section>
      <div class="business-categories">
          <!-- this is the new syntax for ng-repeat -->
          <div class="business-category" *ngFor="let businesscategory of businesscategories">
            {{businesscategory.name}}
            <div class="business-type" *ngFor="let businesstype of businesscategory.businessTypes">
                {{businesstype.business_type}}
            </div>
          </div>
      </div>
      <section *ngIf="errorMessage">
        {{errorMessage}}
      </section>
  </section>
  `
})
export class BusinessTypeListComponent implements OnInit {
  businesscategories: BusinessCategory[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  businessCategories: any = {};

  constructor(private businessTypesService: BusinessTypeService) {}

  ngOnInit() {
    this.businessTypesService
      .getAll()
      .subscribe(
         /* happy path */ b => this.businesscategories = b,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */ () => this.isLoading = false);
  }
}
