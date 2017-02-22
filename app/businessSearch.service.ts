import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class BusinessSearchService {
    private searchedString = new Subject();

    getData() {
        return this.searchedString;
    }

    updateValue(value: string) {
        this.searchedString.next(value);
    }
}