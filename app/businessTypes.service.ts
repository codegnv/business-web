import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BusinessType } from './businessType';
import { BusinessCategory } from './businessCategory';
import { Permit } from './permit';

@Injectable()
export class BusinessTypeService {
    private baseUrl: string = 'https://data.cityofgainesville.org/resource';
    private typesPath: string = 'pp75-zh6w.json';
    private permitsPath: string = 'mfe4-6q3g.json';

    constructor(private http: Http) {
    }

    getPermits() {
        return this.http.get(`${this.baseUrl}/${this.permitsPath}`)
            .map((res: Response) => res.json())
            .catch(handleError);
    }

    getBusinessCategories() {
        return this.getPermits().flatMap(permits =>
            this.http.get(`${this.baseUrl}/${this.typesPath}`)
                .map((res: Response) => res.json())
                .flatMap(types => types)
                .groupBy((businessType: BusinessType) => businessType.business_category)
                .map((businessTypes: any) => {
                    let businessCategory: BusinessCategory = new BusinessCategory(businessTypes.key);

                    businessTypes.subscribe((businessType: BusinessType) => {
                        businessType.permits = permits.filter((permit: Permit) =>
                            'Required' === businessType[permit.permit_name]
                        );
                        businessCategory.add(businessType);
                    });

                    return businessCategory;
                })
                .toArray()
        ).catch(handleError);
    }
}

function handleError (error: any) {
    let errorMsg = error.message || `There was a problem retrieving data from
    https://data.cityofgainesville.org, it might be down.`;
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}
