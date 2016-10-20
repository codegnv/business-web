import { Component } from '@angular/core';
import { BusinessTypeService } from './businessTypes.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [BusinessTypeService]
})
export class AppComponent {
  title: string = 'Business Types!';
}
