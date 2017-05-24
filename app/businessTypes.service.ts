import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BusinessType } from './businessType';
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
                return combineTypesAndPermits(businessTypes, permits);
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
        permit_location: r.permit_location,
        permit_description: r.permit_description,
        online_submission: r.online_submission,
        permit_name: r.permit_name,
    });
    return permit;
}

function combineTypesAndPermits(businessTypes: BusinessType[], permits: Permit[]): BusinessType[] {
    // Initialize permit lookup object
    let permitNames: any = {};
    // Populate permit lookup object
    // This prevents us from iterating over the list of permits if we
    // only want one and allows us to individually add permits from
    // this object as if it were a lookup table
    for (let permit of permits) {
        permitNames[permit.permit_name] = permit;
    }

    // Initialize array of BusinessTypes to be populated and returned by this function
    let returnBusinessTypes: BusinessType[] = [];

    for (let businessType of businessTypes) {
        let permitsForThisType: Permit[] = [];
        let conditionalPermitsForThisType: Permit[] = [];
        let businessDescription = 'Business Description Coming Fall 2013';
        if (businessType.hasOwnProperty('business_description')) {
            businessDescription = businessType.business_description;
        }
        for (let permitName in permitNames) {
            if (permitNames.hasOwnProperty(permitName)) {
                if (businessType[permitName] === 'Required') {
                    permitsForThisType.push(permitNames[permitName]);
                } else if (businessType[permitName] === 'Conditionally Required') {
                    conditionalPermitsForThisType.push(permitNames[permitName]);
                }

            }
        }
        let finalBusinessType = <BusinessType>({
            business_type: businessType.business_type,
            business_description: businessDescription,
            business_category: businessType.business_category,
            requiredPermits: permitsForThisType,
            conditionalPermits: conditionalPermitsForThisType
        });
        returnBusinessTypes.push(finalBusinessType);
    }
    return returnBusinessTypes;
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
