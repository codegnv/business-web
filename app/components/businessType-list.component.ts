import { Component, OnInit } from '@angular/core';
import { BusinessTypeService } from '../businessTypes.service';
import { BusinessCategory } from '../businessCategory';
import { BusinessType } from '../businessType';
import {
    trigger,
    style,
    transition,
    animate
} from '@angular/core';
import { BusinessSearchService } from '../businessSearch.service';

@Component({
    selector: 'businesstype-list',
    templateUrl: './businessType-list.component.html',

    animations: [
        trigger('flyInOut', [
            transition('void => *', [
                style({transform: 'translateX(100%)'}),
                animate(100)
            ]),
            transition('* => void', [
                style({transform: 'translateX(100%)'}),
                animate(100)
            ]),
        ]),
        trigger('collapse', [
            transition('void => *', [
                style({height: 0}),
                animate(100, style({height: '*'})),
            ]),
            transition('* => void', [
                style({height: '*'}),
                animate(100, style({height: 0})),
            ])
        ])
    ]

})
export class BusinessTypeListComponent implements OnInit {
    displayedCategories: any = [];
    finalBusinessCategories: any = [];
    errorMessage: string = '';
    isLoading: boolean = true;

    businessCategoryTypesListState: string = 'closed';

    selectedbusinessCategory: BusinessCategory[] = [];
    selectedBusinessType: BusinessType[] = [];
    toggleAllBusinessTypes: boolean = true;
    togglebusinessCategories: boolean =  true;
    toggleSelectedBusinesstype: boolean = false;

    showSelectedBusinesstype: boolean = false;

    constructor(private businessTypesService: BusinessTypeService, private businessSearchService: BusinessSearchService) {}

    ngOnInit() {
        this.businessSearchService.getData().subscribe(val => {
            if (val) {
                let searchBusinessCategories = [];
                for (let businessCategory of this.finalBusinessCategories) {
                    if (businessCategory.name.toLowerCase().indexOf(val) !== -1) {
                        searchBusinessCategories.push(businessCategory);
                    } else {
                        let newCategory = <BusinessCategory>({});
                        newCategory.name = businessCategory.name;
                        newCategory.businessTypes = [];

                        for (let businessType of businessCategory.businessTypes) {
                            if (businessType.business_type.toLowerCase().indexOf(val) !== -1) {
                                newCategory.businessTypes.push(businessType);
                            } else {
                                // if we want the search to go deeper
                                // like checking each individual permit's name
                            }
                        }

                        if (newCategory.businessTypes.length) {
                            searchBusinessCategories.push(newCategory);
                        }
                    }
                }
                this.displayedCategories = searchBusinessCategories;
                this.selectedbusinessCategory = null;
                this.selectedBusinessType = null;
            } else {
                this.displayedCategories = this.finalBusinessCategories;
            }
        });
        this.businessTypesService
        .getAll()
        .subscribe(
            b => {
                /* happy path */
                this.finalBusinessCategories = b;
                this.displayedCategories = this.finalBusinessCategories;
            },
            e => {
                /* error path */
                this.errorMessage = e;
            },
            () => {
                /* onComplete */
                this.isLoading = false;
            });
    }
    onClickTogglebusinessCategories(): void {
        this.togglebusinessCategories = !this.togglebusinessCategories;
    }
    onSelectBusinessCategory(BusinessCategory: BusinessCategory[]): void {
        if ( BusinessCategory !== this.selectedbusinessCategory) {
            this.showSelectedBusinesstype = true;
            this.toggleAllBusinessTypes = true;
            this.toggleSelectedBusinesstype =  false;
            this.selectedbusinessCategory = BusinessCategory;
            this.businessCategoryTypesListState = (this.businessCategoryTypesListState === 'closed' ? 'open' : 'closed');
        } else {
            this.selectedbusinessCategory = BusinessCategory;
            this.toggleAllBusinessTypes = true;
            this.toggleSelectedBusinesstype =  false;
            this.showSelectedBusinesstype =  !this.showSelectedBusinesstype;
            this.businessCategoryTypesListState = (this.businessCategoryTypesListState === 'closed' ? 'open' : 'closed');
        }
    }
    onSelectBusinessCategoryType(BusinessCategoryType: BusinessType[]): void {
        this.toggleAllBusinessTypes = false;
        this.selectedBusinessType = BusinessCategoryType;
    }
}
