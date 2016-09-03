import { Component } from '@angular/core';
import { BusinessTypeService } from './businessTypes.service';

@Component({
  selector: 'my-app',
  template: `
  <h1> {{title}} </h1>
  <router-outlet>
  `,
  providers: [BusinessTypeService]
})
export class AppComponent {
  title: string = 'Business Types!';
}
