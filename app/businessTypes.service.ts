import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BusinessType } from './businessType';
import { BusinessCategory } from './businessCategory';

@Injectable()
export class BusinessTypeService {
    // private baseUrl: string = 'https://data.cityofgainesville.org/resource/pp75-zh6w.json';
    private baseUrl: string = 'http://localhost:8081/businesstypes.json';

    constructor(private http: Http) {
    }

    getAll(): Observable<BusinessCategory[]> {
        return this.http
        .get(`${this.baseUrl}`, {headers: this.getHeaders()})
        .map(res => res.json())
        .flatMap(array => array)
        .groupBy((businessType: BusinessType) => businessType.business_category)
        .flatMap(businessCategories => businessCategories.reduce((acc: any, businessType: BusinessType) => {
            acc.name = businessType.business_category;
            acc.businessTypes.push(businessType);
            return acc;
        }, {businessTypes: []}))
        .toArray()
        .catch(handleError);
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}

// this could also be a private method of the component class
function handleError (error: any) {
    // log error
    // could be something more sofisticated
    let errorMsg = error.message || `There was a problem retrieving data from
    https://data.cityofgainesville.org, it might be down.`;
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}
