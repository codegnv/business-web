import { Component, OnInit } from '@angular/core';
import { BusinessTypeService } from '../businessTypes.service';
import { BusinessCategory } from '../businessCategory';
import { BusinessType } from '../businessType';
import { Permit } from '../permit';
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

    selectedBusinessCategories: Set<BusinessCategory> = new Set<BusinessCategory>();
    selectedBusinessTypes: Set<BusinessType> = new Set<BusinessType>();
    requiredPermitsToShowSet: Set<Permit> = new Set<Permit>();
    requiredPermitsToShow: Permit[] = [];
    conditionalPermitsToShowSet: Set<Permit> = new Set<Permit>();
    conditionalPermitsToShow: Permit[] = [];
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
            } else {
                this.displayedCategories = this.finalBusinessCategories;
            }
            this.selectedBusinessCategories = new Set<BusinessCategory>();
            this.selectedBusinessTypes = new Set<BusinessType>();
            this.requiredPermitsToShowSet = new Set<Permit>();
            this.requiredPermitsToShow = [];
            this.conditionalPermitsToShowSet = new Set<Permit>();
            this.conditionalPermitsToShow = [];
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
    onSelectBusinessCategory(BusinessCategory: BusinessCategory): void {
        if (this.selectedBusinessCategories.has(BusinessCategory)) {
            this.selectedBusinessCategories.delete(BusinessCategory);
        } else {
            this.selectedBusinessCategories.add(BusinessCategory);
        }
    }
    onSelectBusinessCategoryType(BusinessCategoryType: BusinessType): void {
        this.toggleAllBusinessTypes = false;
        if (this.selectedBusinessTypes.has(BusinessCategoryType)) {
            this.selectedBusinessTypes.delete(BusinessCategoryType);
        } else {
            this.selectedBusinessTypes.add(BusinessCategoryType);
        }

        this.requiredPermitsToShowSet.clear();
        this.conditionalPermitsToShowSet.clear();
        for (const businessType of Array.from(this.selectedBusinessTypes)) {
            businessType.requiredPermits.forEach((permit: Permit) => this.requiredPermitsToShowSet.add(permit));
            businessType.conditionalPermits.forEach((permit: Permit) => this.conditionalPermitsToShowSet.add(permit));
        }

        const permitSort = (permita: Permit, permitb: Permit) => {
            if (permita.friendly_name < permitb.friendly_name) {
                return -1;
            } else if (permita.friendly_name > permitb.friendly_name) {
                return 1;
            }
            return 0;
        };

        this.requiredPermitsToShow = Array.from(this.requiredPermitsToShowSet).sort(permitSort);
        this.conditionalPermitsToShow = Array.from(this.conditionalPermitsToShowSet).sort(permitSort);
    }
}
