import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './steps.component.html',
})
export class StepsComponent implements OnInit, OnDestroy {
    stepNum: number;
    paramsSub: any;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.paramsSub = this.activatedRoute.params.subscribe((params: any) =>
            this.stepNum = params.num);
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }
}
