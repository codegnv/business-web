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
            icon: '/images/icons/dream.svg',
            class: 'stage-yellow'
        }, {
            name : 'Plan',
            link: '/steps/2',
            icon: '/images/icons/plan.svg',
            class: 'stage-yellow'
        }, {
            name : 'Finance',
            link: '/steps/3',
            icon: '/images/icons/finance.svg',
            class: 'stage-yellow'
        }, {
            name : 'Legalize',
            link: '/steps/4',
            icon: '/images/icons/legalize.svg',
            class: 'stage-yellow'
        }, {
            name : 'Brand',
            link: '/steps/5',
            icon: '/images/icons/brand.svg',
            class: 'stage-yellow'
        }, {
            name : 'Search',
            link: '/steps/6',
            icon: '/images/icons/search.svg',
            class: 'stage-blue'
        }, {
            name : 'Permit',
            link: '/permit-locator',
            icon: '/images/icons/permit.svg',
            class: 'stage-blue'
        }, {
            name : 'Build',
            link: '/steps/8',
            icon: '/images/icons/build.svg',
            class: 'stage-blue'
        }, {
            name : 'Hire',
            link: '/steps/10',
            icon: '/images/icons/hire.svg',
            class: 'stage-red'
        }, {
            name : 'Taxes',
            link: '/steps/11',
            icon: '/images/icons/taxes.svg',
            class: 'stage-red'
        }, {
            name : 'Celebrate',
            link: '/steps/12',
            icon: '/images/icons/celebrate.svg',
            class: 'stage-red'
        }, {
            name : 'Open',
            link: '/steps/13',
            icon: '/images/icons/open.svg',
            class: 'stage-red'
        }, {
            name : 'Grow',
            link: '/steps/14',
            icon: '/images/icons/grow.svg',
            class: 'stage-red'
        }
    ];
}
