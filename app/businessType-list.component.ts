import { Component, OnInit } from '@angular/core';
import { BusinessTypeService } from './businessTypes.service';

@Component({
  selector: 'businesstype-list',
  template: `
  <section>
    <section *ngIf="isLoading && !errorMessage">
    Retrieving data from data.cityofgainesville.org...
    </section>
      <div class="business-categories">
          <!-- this is the new syntax for ng-repeat -->
          <div class="business-category" *ngFor="let businessCategory of finalBusinessCategories">
            {{businessCategory.name}}
            <div class="business-type" *ngFor="let businessType of businessCategory.businessTypes">
                {{businessType.business_type}}
                <div class="permit" *ngFor="let permit of businessType.permits">
                    {{permit.friendly_name}}
                </div>
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
    finalBusinessCategories: any = [];
    errorMessage: string = '';
    isLoading: boolean = true;

    constructor(private businessTypesService: BusinessTypeService) {}

    ngOnInit() {
        this.businessTypesService
        .getAll()
        .subscribe(
             /* happy path */ b => this.finalBusinessCategories = b,
             /* error path */ e => this.errorMessage = e,
             /* onComplete */ () => this.isLoading = false);
    }
}
