import { Component, OnInit } from '@angular/core';
import { BusinessType } from './businessType';
import { BusinessTypeService } from './businessTypes.service';
import { BusinessCategory } from './businessCategory';
import { Permit } from './permit';

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
    businessTypes: BusinessType[] = [];
    permits: Permit[] = [];
    finalBusinessCategories: BusinessCategory[] = [];
    errorMessage: string = '';
    isLoading: boolean = true;
    businessCategories: any = {};

    constructor(private businessTypesService: BusinessTypeService) {}

    ngOnInit() {
        this.businessTypesService
        .getAll()
        .subscribe(
            data => {
                this.businessTypes = data[0];
                this.permits = data[1];
                this.finalBusinessCategories = this.combineCategoriesAndPermits(this.businessTypes, this.permits);
                this.isLoading = false;
                this.errorMessage = '';
            }
        );
    }

    combineCategoriesAndPermits(businessTypes: BusinessType[], permits: Permit[]): BusinessCategory[] {
        // Initialize permit lookup object
        let permitNames: any = {};
        // Populate permit lookup object
        // This prevents us from iterating over the list of permits if we
        // only want one and allows us to individually add permits from
        // this object as if it were a lookup table
        for (let permit of permits) {
            permitNames[permit.permit_name] = permit;
        }

        let businessCategories: any = {};
        // Deduplicate Business Categories
        for (let businessType of businessTypes) {
            businessCategories[businessType.business_category] = true;
        }

        // Initialize array of BusinessCategories to be populated and returned by this function
        let returnBusinessCategories: BusinessCategory[] = [];

        // Loop through deduplicated businessCategories
        for (let businessCategory in businessCategories) {
            if (businessCategories.hasOwnProperty(businessCategory)) {
                // Initialize empty array of type BusinessType to be used in our BusinessCategory
                let businessTypesForThisCategory: BusinessType[] = [];
                let businessTypesWithPermits: BusinessType[] = [];
                for (let businessType of businessTypes) {
                    // Find business types that have the same category as the category we are currently on in the parent loop
                    if (businessType.business_category === businessCategory) {
                        businessTypesForThisCategory.push(businessType);
                    }
                }

                for (let businessTypeForThisCategory of businessTypesForThisCategory) {
                    let permitsForThisType: Permit[] = [];
                    for (let permitName in permitNames) {
                        if (permitNames.hasOwnProperty(permitName)) {
                            if (businessTypeForThisCategory[permitName] === 'Required') {
                                permitsForThisType.push(permitNames[permitName]);
                            }
                        }
                    }
                    let finalBusinessType = <BusinessType>({
                        business_type: businessTypeForThisCategory.business_type,
                        business_category: businessTypeForThisCategory.business_category,
                        permits: permitsForThisType
                    });
                    businessTypesWithPermits.push(finalBusinessType);
                }

                let finalBusinessCategory = <BusinessCategory>({
                    // name: string
                    name: businessCategory,
                    // businessTypes: BusinessType[]
                    businessTypes: businessTypesWithPermits
                });
                returnBusinessCategories.push(finalBusinessCategory);
            }
        }
        return returnBusinessCategories;
    }
}
