import { Routes, RouterModule } from '@angular/router';
import { BusinessTypeListComponent } from './components/businessType-list.component';
import { StepsComponent } from './components/steps.component';
import { LandingComponent } from './components/landing/landing.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

// Route config let's you map routes to components
const routes: Routes = [
    {
        path: 'steps/9',
        redirectTo: 'permit-locator',
    },

    {
        path: 'steps/:num',
        // NOTE Currently all pages redirect to step 9 / business types list
        // Other pages to be implemented later
        component: StepsComponent,
    },

    {
        path: 'permit-locator',
        component: BusinessTypeListComponent,
    },

    {
        path: 'home',
        component: LandingComponent
    },

    {
        path: 'contact',
        component: ContactComponent
    },

    {
        path: 'about',
        component: AboutComponent
    },

    {
        path: 'disclaimer',
        component: DisclaimerComponent
    },

    {
        path: '**',
        redirectTo: 'home'
    },
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes, { useHash: true });
