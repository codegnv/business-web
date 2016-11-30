import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BusinessType } from './businessType';
import { BusinessCategory } from './businessCategory';
import { Permit } from './permit';

@Injectable()
export class BusinessTypeService {
    private baseUrl: string = 'https://data.cityofgainesville.org/resource';
    private typesPath: string = 'i9px-haju.json';
    private permitsPath: string = 'mfe4-6q3g.json';


    constructor(private http: Http) {
    }

    getPermits(): Observable<Permit[]> {
        let permits = this.http
        .get(`${this.baseUrl}/${this.permitsPath}`, {headers: this.getHeaders()})
        .map(parsePermits)
        .catch(handleError);
        return permits;
    }

    getBusinessTypes(): Observable<BusinessType[]> {
        let businessTypes = this.http
        .get(`${this.baseUrl}/${this.typesPath}`, {headers: this.getHeaders()})
        .map((res: Response) => res.json())
        .catch(handleError);
        return businessTypes;
    }

    getAll() {
        return Observable.forkJoin(
            this.getPermits(),
            this.getBusinessTypes(),
            function(permits, businessTypes) {
                return combineCategoriesAndPermits(businessTypes, permits);
            }
        );
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}

function parsePermits(response: Response): Permit[] {
    // uncomment to simulate error:
    // throw new Error('ups! Force choke!');

    let permits: Permit[] = response.json().map(toPermit);

    return permits;
}

function toPermit(r: any): Permit {
    let permit = <Permit>({
        friendly_name: r.friendly_name,
        url: r.url,
        permit_name: r.permit_name,
    });
    return permit;
}

function combineCategoriesAndPermits(businessTypes: BusinessType[], permits: Permit[]): BusinessCategory[] {
    // Initialize permit lookup object
    let permitNames: any = {};
    // Populate permit lookup object
    // This prevents us from iterating over the list of permits if we
    // only want one and allows us to individually add permits from
    // this object as if it were a lookup table
    for (let permit of permits) {
        permitNames[permit.permit_name] = permit;
    }

    let businessCategories: any = {};
    // Deduplicate Business Categories
    for (let businessType of businessTypes) {
        businessCategories[businessType.business_category] = true;
    }

    // Initialize array of BusinessCategories to be populated and returned by this function
    let returnBusinessCategories: BusinessCategory[] = [];

    // Loop through deduplicated businessCategories
    for (let businessCategory in businessCategories) {
        if (businessCategories.hasOwnProperty(businessCategory)) {
            // Initialize empty array of type BusinessType to be used in our BusinessCategory
            let businessTypesForThisCategory: BusinessType[] = [];
            let businessTypesWithPermits: BusinessType[] = [];
            for (let businessType of businessTypes) {
                // Find business types that have the same category as the category we are currently on in the parent loop
                if (businessType.business_category === businessCategory) {
                    businessTypesForThisCategory.push(businessType);
                }
            }

            for (let businessTypeForThisCategory of businessTypesForThisCategory) {
                let permitsForThisType: Permit[] = [];
                for (let permitName in permitNames) {
                    if (permitNames.hasOwnProperty(permitName)) {
                        if (businessTypeForThisCategory[permitName] === 'Required') {
                            permitsForThisType.push(permitNames[permitName]);
                        }
                    }
                }
                let finalBusinessType = <BusinessType>({
                    business_type: businessTypeForThisCategory.business_type,
                    business_category: businessTypeForThisCategory.business_category,
                    permits: permitsForThisType
                });
                businessTypesWithPermits.push(finalBusinessType);
            }

            let finalBusinessCategory = <BusinessCategory>({
                // name: string
                name: businessCategory,
                // businessTypes: BusinessType[]
                businessTypes: businessTypesWithPermits
            });
            returnBusinessCategories.push(finalBusinessCategory);
        }
    }
    return returnBusinessCategories;
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
