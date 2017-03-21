import { Routes, RouterModule } from '@angular/router';
import { BusinessTypeListComponent } from './components/businessType-list.component';
import { StepsComponent } from './components/steps.component';

// Route config let's you map routes to components
const routes: Routes = [
    {
        path: 'steps/9',
        redirectTo: 'permit-locator',
    },

    {
        path: 'steps/:num',
        component: StepsComponent,
    },

    {
        path: 'permit-locator',
        component: BusinessTypeListComponent,
    },

    {
        path: '**',
        redirectTo: '/steps/1'
    },
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes, { useHash: true });
