import { Component, OnInit } from '@angular/core';
import { BusinessTypeService } from '../businessTypes.service';
import { BusinessSearchService } from '../businessSearch.service';
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
                animate(100, style({transform: 'translateX(100%)'}))
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
    displayedTypes: any = [];
    businessTypes: any = [];
    displayedPermits: any = [];
    errorMessage: string = '';
    isLoading: boolean = true;

    selectedBusinessTypes: Set<BusinessType> = new Set<BusinessType>();
    requiredPermitsToShowSet: Set<Permit> = new Set<Permit>();
    requiredPermitsToShow: Permit[] = [];
    conditionalPermitsToShowSet: Set<Permit> = new Set<Permit>();
    conditionalPermitsToShow: Permit[] = [];
    toggleAllBusinessTypes: boolean = true;
    togglebusinessTypes: boolean =  true;
    toggleSelectedBusinesstype: boolean = false;

    showSelectedBusinesstype: boolean = false;

    constructor(private businessTypesService: BusinessTypeService, private businessSearchService: BusinessSearchService) {}

    ngOnInit() {
        this.businessSearchService.getData().subscribe(val => {
            if (val) {
                let searchBusinessTypes = [];

                for (let businessType of this.businessTypes) {
                    if (businessType.business_type.toLowerCase().indexOf(val) !== -1) {
                        searchBusinessTypes.push(businessType);
                    } else {
                        let newBusinessType = <BusinessType>({});
                        newBusinessType.business_category = businessType.business_category;
                        newBusinessType.business_type = businessType.business_type;
                        newBusinessType.requiredPermits = [];
                        newBusinessType.conditionalPermits = [];

                        // check required permits and add matching ones to result
                        for (let businessRequiredPermit of businessType.requiredPermits) {
                            if (businessRequiredPermit.friendly_name.toLowerCase().indexOf(val) !== -1) {
                                newBusinessType.requiredPermits.push(businessRequiredPermit);
                            }
                        }

                        // check conditional permits and add matching ones to result
                        for (let businessConditionalPermit of businessType.conditionalPermits) {
                            if (businessConditionalPermit.friendly_name.toLowerCase().indexOf(val) !== -1) {
                                newBusinessType.conditionalPermits.push(businessConditionalPermit);
                            }
                        }

                        if (newBusinessType.requiredPermits.length || newBusinessType.conditionalPermits.length) {
                            searchBusinessTypes.push(newBusinessType);
                        }
                    }
                }

                if (searchBusinessTypes.length) {
                    this.displayedTypes = searchBusinessTypes;
                }
            } else {
                this.displayedTypes = this.businessTypes;
            }
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
                this.businessTypes = b;
                this.displayedTypes = this.businessTypes;
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
    onClickTogglebusinessTypes(): void {
        this.togglebusinessTypes = !this.togglebusinessTypes;
    }
    onSelectBusinessType(selectedBusinessType: BusinessType): void {
        this.toggleAllBusinessTypes = false;
        if (this.selectedBusinessTypes.has(selectedBusinessType)) {
            this.selectedBusinessTypes.delete(selectedBusinessType);
        } else {
            this.selectedBusinessTypes.add(selectedBusinessType);
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
