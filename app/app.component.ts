import { Component } from '@angular/core';
import { BusinessTypeService } from './businessTypes.service';
import { BusinessSearchService } from './businessSearch.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [BusinessTypeService, BusinessSearchService]
})
export class AppComponent {
    navbarCollapsed = true;
    title: string = 'Business Types!';
    onNavClick(): void {
        this.navbarCollapsed = true;
    }
    appRoutes = [
        {
            name : 'Step 1',
            link: '/steps/1',
            class: ''
        }, {
            name : 'Step 2',
            link: '/steps/2',
            class: ''
        }, {
            name : 'Step 3',
            link: '/steps/3',
            class: ''
        }, {
            name : 'Step 4',
            link: '/steps/4',
            class: ''
        }, {
            name : 'Step 5',
            link: '/steps/5',
            class: ''
        }, {
            name : 'Step 6',
            link: '/steps/6',
            class: ''
        }, {
            name : 'Step 7',
            link: '/steps/7',
            class: ''
        }, {
            name : 'Step 8',
            link: '/steps/8',
            class: ''
        }, {
            name : 'Permit Locator',
            link: '/permit-locator',
            class: ''
        }, {
            name : 'Step 10',
            link: '/steps/10',
            class: ''
        }, {
            name : 'Step 11',
            link: '/steps/11',
            class: ''
        }
    ];
}
