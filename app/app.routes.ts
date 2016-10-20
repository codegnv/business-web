import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { BusinessTypeListComponent } from './businessType-list.component';

// Route config let's you map routes to components
const routes: Routes = [
  // map '/businesstypes' to the people list component
  {
    path: 'businesstypes',
    component: BusinessTypeListComponent,
  },

  // map '/' to '/businesstypes' as our default route
  {
    path: '',
    redirectTo: '/businesstypes',
    pathMatch: 'full'
  },
    
  { 
    path: '**', 
    redirectTo: '' 
  }
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);
