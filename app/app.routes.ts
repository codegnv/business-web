import { Routes, RouterModule } from '@angular/router';

import { PeopleListComponent } from './people-list.component';
import { PersonDetailsComponent } from './person-details.component';

import { BusinessTypeListComponent } from './businessType-list.component';
// import { PersonDetailsComponent } from './person-details.component';

// Route config let's you map routes to components
const routes: Routes = [
  // map '/persons' to the people list component
  {
    path: 'persons',
    component: PeopleListComponent,
  },
  // map '/persons/:id' to person details component
  {
    path: 'persons/:id',
    component: PersonDetailsComponent
  },

  // map '/businesstypes' to the people list component
  {
    path: 'businesstypes',
    component: BusinessTypeListComponent,
  },

  // map '/' to '/persons' as our default route
  {
    path: '',
    redirectTo: '/businesstypes',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
