import { Component } from '@angular/core';
import { BusinessTypeService } from './businessTypes.service';
import { BusinessSearchService } from './businessSearch.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [BusinessTypeService, BusinessSearchService]
})
export class AppComponent {
    title: string = 'Business Types!';
}
