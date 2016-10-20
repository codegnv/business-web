import { Component, OnInit } from '@angular/core';
import { BusinessTypeService } from './businessTypes.service';
import { BusinessCategory } from './businessCategory';
import { BusinessType } from './businessType';
import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

@Component({
  selector: 'businesstype-list',
  templateUrl: './businessType-list.component.html',

  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(100)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate(100)
      ]),
      // transition('* => void', [
      //   animate(100, style({transform: 'translateX(-100%)'}))
      // ])
    ])
  ]
    
})
export class BusinessTypeListComponent implements OnInit {
    finalBusinessCategories: any = [];
    errorMessage: string = '';
    isLoading: boolean = true;
    selectedbusinessCategory: BusinessCategory[] = [];
    selectedbusinesstype: BusinessType[] = [];


    constructor(private businessTypesService: BusinessTypeService) {}

    ngOnInit() {
        this.businessTypesService
        .getAll()
        .subscribe(
             /* happy path */ b => this.finalBusinessCategories = b,
             /* error path */ e => this.errorMessage = e,
             /* onComplete */ () => this.isLoading = false);
    }
   onSelect(BusinessCategory: BusinessCategory[]): void {
    this.selectedbusinessCategory = BusinessCategory;      
  }
}
