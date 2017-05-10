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

    selectedBusinessType: BusinessType;
    toggleAllBusinessTypes: boolean = true;
    toggleSelectedBusinesstype: boolean = false;

    showSelectedBusinesstype: boolean = false;

    constructor(private businessTypesService: BusinessTypeService, private businessSearchService: BusinessSearchService) {}

    ngOnInit() {
        this.businessSearchService.getData().subscribe((val: string) => {
            if (val) {
                let searchBusinessTypes = [];

                for (let businessType of this.businessTypes) {
                    if (businessType.business_type.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                        searchBusinessTypes.push(businessType);
                    } else {
                        // if we want the search to go deeper
                        // like checking each individual permit's name
                    }
                }

                if (searchBusinessTypes.length) {
                    this.displayedTypes = searchBusinessTypes;
                }
            } else {
                this.displayedTypes = this.businessTypes;
            }
        });
        this.businessTypesService
        .getAll()
        .subscribe(
            b => {
                /* happy path */
                this.businessTypes = b;
                this.displayedTypes = this.businessTypes;

                // Find permits that apply to all business types
                const permitsForAllBusinessTypes = {
                    requiredBusinessTypesByPermit: {},
                    conditionalBusinessTypesByPermit: {},
                };

                this.businessTypes.forEach((businessType: BusinessType) => {
                    // Loop over each business type to get its permit list
                    // Keep a count of how many businesses use each permit
                    ['required', 'conditional'].forEach((key: string) => {
                        businessType[`${key}Permits`].forEach((permit: Permit) => {
                            const permitKey = permitsForAllBusinessTypes[`${key}BusinessTypesByPermit`];
                            if (permitKey.hasOwnProperty(permit.permit_name)) {
                                permitKey[permit.permit_name]++;
                                if (permitKey[permit.permit_name] === this.businessTypes.length) {
                                    // this[`${key}AllBusinessPermits`].push(permit);
                                }
                            } else {
                                permitKey[permit.permit_name] = 1;
                            }
                        });
                    });
                });
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
    onSelectBusinessType(selectedBusinessType: BusinessType): void {
        this.toggleAllBusinessTypes = false;
        this.selectedBusinessType = selectedBusinessType;
    }
}
