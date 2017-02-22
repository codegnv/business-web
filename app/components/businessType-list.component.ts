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

    constructor(private businessTypesService: BusinessTypeService) {}

    ngOnInit() {
        this.businessTypesService
        .getAll()
        .subscribe(
            /* happy path */ b => this.finalBusinessCategories = b,
                /* error path */ e => this.errorMessage = e,
                /* onComplete */ () => this.isLoading = false);
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
