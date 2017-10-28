import { Component } from '@angular/core';
import { BusinessTypeService } from './businessTypes.service';
import { BusinessSearchService } from './businessSearch.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [BusinessTypeService, BusinessSearchService]
})
export class AppComponent {
    dreamIcon = require('../images/icons/Dream.svg');
    planIcon = require('../images/icons/Plan.svg');
    financeIcon = require('../images/icons/Finance.svg');
    legalizeIcon = require('../images/icons/Legalize.svg');
    brandIcon = require('../images/icons/Brand.svg');
    searchIcon = require('../images/icons/Search.svg');
    permitIcon = require('../images/icons/Permit.svg');
    buildIcon = require('../images/icons/Build.svg');
    hireIcon = require('../images/icons/Hire.svg');
    taxesIcon = require('../images/icons/Taxes.svg');
    celebrateIcon = require('../images/icons/Celebrate.svg');
    openIcon = require('../images/icons/Open.svg');
    growIcon = require('../images/icons/Grow.svg');

    navbarCollapsed = true;
    title: string = 'Business Types!';
    onNavClick(): void {
        this.navbarCollapsed = true;
    }
    appRoutes = [
        {
            name : 'Dream',
            link: '/steps/1',
            icon: this.dreamIcon,
            class: 'stage-yellow'
        }, {
            name : 'Plan',
            link: '/steps/2',
            icon: this.planIcon,
            class: 'stage-yellow'
        }, {
            name : 'Finance',
            link: '/steps/3',
            icon: this.financeIcon,
            class: 'stage-yellow'
        }, {
            name : 'Legalize',
            link: '/steps/4',
            icon: this.legalizeIcon,
            class: 'stage-yellow'
        }, {
            name : 'Brand',
            link: '/steps/5',
            icon: this.brandIcon,
            class: 'stage-yellow'
        }, {
            name : 'Search',
            link: '/steps/6',
            icon: this.searchIcon,
            class: 'stage-blue'
        }, {
            name : 'Permit',
            link: '/permit-locator',
            icon: this.permitIcon,
            class: 'stage-blue'
        }, {
            name : 'Build',
            link: '/steps/8',
            icon: this.buildIcon,
            class: 'stage-blue'
        }, {
            name : 'Hire',
            link: '/steps/10',
            icon: this.hireIcon,
            class: 'stage-red'
        }, {
            name : 'Taxes',
            link: '/steps/11',
            icon: this.taxesIcon,
            class: 'stage-red'
        }, {
            name : 'Celebrate',
            link: '/steps/12',
            icon: this.celebrateIcon,
            class: 'stage-red'
        }, {
            name : 'Open',
            link: '/steps/13',
            icon: this.openIcon,
            class: 'stage-red'
        }, {
            name : 'Grow',
            link: '/steps/14',
            icon: this.growIcon,
            class: 'stage-red'
        }
    ];
}
