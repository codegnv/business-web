import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'bp-permit',
    templateUrl: './bpPermit.component.html',
    encapsulation: ViewEncapsulation.None
})

export class BpPermitComponent {
    @Input() permit: any;
    constructor() {}
}
