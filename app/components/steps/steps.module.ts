import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsComponent } from './steps.component';
import { Step1Component } from './step-1/step-1.component';
import { Step2Component } from './step-2/step-2.component';
import { Step3Component } from './step-3/step-3.component';
import { Step4Component } from './step-4/step-4.component';
import { Step5Component } from './step-5/step-5.component';
import { Step6Component } from './step-6/step-6.component';
import { Step10Component } from './step-10/step-10.component';
import { Step11Component } from './step-11/step-11.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    StepsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step10Component,
    Step11Component
  ]
})
export class StepsModule {}