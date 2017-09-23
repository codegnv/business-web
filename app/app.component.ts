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
            name : 'Dream',
            link: '/steps/1',
            icon: 'fa-cloud',
            class: 'stage-yellow'
        }, {
            name : 'Plan',
            link: '/steps/2',
            icon: 'fa-bar-chart',
            class: 'stage-yellow'
        }, {
            name : 'Finance',
            link: '/steps/3',
            icon: 'fa-bank',
            class: 'stage-yellow'
        }, {
            name : 'Legalize',
            link: '/steps/4',
            icon: 'fa-copyright',
            class: 'stage-yellow'
        }, {
            name : 'Brand',
            link: '/steps/5',
            icon: 'fa-tag',
            class: 'stage-yellow'
        }, {
            name : 'Search',
            link: '/steps/6',
            icon: 'fa-map-signs',
            class: 'stage-blue'
        }, {
            name : 'Permit',
            link: '/permit-locator',
            icon: 'fa-signing',
            class: 'stage-blue'
        }, {
            name : 'Build',
            link: '/steps/8',
            icon: 'fa-building',
            class: 'stage-blue'
        }, {
            name : 'Hire',
            link: '/steps/10',
            icon: 'fa-group',
            class: 'stage-red'
        }, {
            name : 'Taxes',
            link: '/steps/11',
            icon: 'fa-balance-scale',
            class: 'stage-red'
        }, {
            name : 'Celebrate',
            link: '/steps/12',
            icon: 'fa-birthday-cake',
            class: 'stage-red'
        }, {
            name : 'Open',
            link: '/steps/13',
            icon: 'fa-shopping-bag',
            class: 'stage-red'
        }, {
            name : 'Grow',
            link: '/steps/14',
            icon: 'fa-line-chart',
            class: 'stage-red'
        }
    ];
}
