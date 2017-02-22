import { Component } from '@angular/core';
import { BusinessSearchService } from '../businessSearch.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {

    constructor(private businessSearchService: BusinessSearchService) {}

    searchString = '';

    searchKeyUp(event: any) {
        // event.keyCode is 13 for 'Enter' Key
        // which we will detect and begin search
        if (event.keyCode === 13) {
            this.businessSearchService.updateValue(this.searchString);
        } else {
            if (this.searchString.trim().length === 0) {
                this.businessSearchService.updateValue('');
            }
        }
    }

    searchBtnClicked() {
        this.businessSearchService.updateValue(this.searchString);
    }
}
