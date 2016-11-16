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
        ]),
         trigger('flyOutIn', [
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(100)
            ]),
        ])
    ]

})
export class BusinessTypeListComponent implements OnInit {
    finalBusinessCategories: any = [];
    errorMessage: string = '';
    isLoading: boolean = true;
    selectedbusinessCategory: BusinessCategory[] = [];
    selectedBusinessType: BusinessType[] = [];
    toggleAllBusinessTypes: boolean = true;
    toggleBtypes: boolean = false;
  
    constructor(private businessTypesService: BusinessTypeService) {}

    ngOnInit() {
        this.businessTypesService
        .getAll()
        .subscribe(
            /* happy path */ b => this.finalBusinessCategories = b,
            /* error path */ e => this.errorMessage = e,
            /* onComplete */ () => this.isLoading = false);
    }
    onSelectBusinessCategory(BusinessCategory: BusinessCategory[]): void {            
        this.selectedbusinessCategory = BusinessCategory;
        this.toggleAllBusinessTypes = true;
        this.toggleBtypes =  !this.toggleBtypes;
    }  
     onSelectBusinessCategoryType(BusinessCategoryType: BusinessType[]): void {
        this.toggleAllBusinessTypes = false;
        this.selectedBusinessType = BusinessCategoryType;
    }   
}
