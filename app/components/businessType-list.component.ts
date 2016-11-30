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

    selectedbusinessCategory: BusinessCategory[] = [];
    selectedBusinessType: BusinessType[] = [];
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
