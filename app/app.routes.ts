import { Routes, RouterModule } from '@angular/router';
import { BusinessTypeListComponent } from './components/businessType-list.component';

// Route config let's you map routes to components
const routes: Routes = [
    // Make / the default website route, call main component
    {
        path: '',
        component: BusinessTypeListComponent,
    },

    {
        path: '**',
        redirectTo: ''
    },
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);
