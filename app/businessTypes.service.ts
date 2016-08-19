import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BusinessType } from './businessType';

@Injectable()
export class BusinessTypeService {
  private baseUrl: string = 'https://data.cityofgainesville.org/resource/pp75-zh6w.json';

  constructor(private http: Http) {
  }

  getAll(): Observable<BusinessType[]> {
    let businessTypes$ = this.http
      .get(`${this.baseUrl}`, {headers: this.getHeaders()})
      .map(mapBusinessTypes)
      .catch(handleError);
      return businessTypes$;
  }

  get(id: number): Observable<BusinessType> {
    let person$ = this.http
      .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
      .map(mapBusinessType);
      return person$;
  }
  /*
  save(person: BusinessType): Observable<Response> {
    // this won't actually work because the StarWars API doesn't
    // is read-only. But it would look like this:
    return this.http
      .put(`${this.baseUrl}/people/${person.id}`, JSON.stringify(person), {headers: this.getHeaders()});
  }
  */

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapBusinessTypes(response: Response): BusinessType[] {
   // uncomment to simulate error:
   // throw new Error('ups! Force choke!');

   // The response of the API has a results
   // property with the actual results
   console.log(response.json());
   return response.json().map(toBusinessType);
}

function toBusinessType(r: any): BusinessType {
  let businessType = <BusinessType>({
    building_commercial: r.building_commercial,
    development_plan_review: r.development_plan_review,
    special_event: r.special_event,
    sign: r.sign,
    wastewater_grease_sand_oil_and_lint_interceptor: r.wastewater_grease_sand_oil_and_lint_interceptor,
    occupational_license_taxes: r.occupational_license_taxes,
    fire_alarm_permit: r.fire_alarm_permit,
    site_plan: r.site_plan,
    tree_removal_commercial: r.tree_removal_commercial,
    fire_alarm_system: r.fire_alarm_system,
    water_ww_construction: r.water_ww_construction,
    change_of_use: r.change_of_use,
    promotional_event: r.promotional_event,
    business_category: r.business_category,
    business_occupational_license: r.business_occupational_license,
    zoning_verification_and_compliance: r.zoning_verification_and_compliance,
    alcoholic_beverageuse_consumption: r.alcoholic_beverageuse_consumption,
    electrical: r.electrical,
    awning: r.awning,
    plumbing: r.plumbing,
    industrial_user_wastewater_discharge: r.industrial_user_wastewater_discharge,
    overhead_banner: r.overhead_banner,
    paving: r.paving,
    fence_wall: r.fence_wall,
    pods_used_by_commercialparcel_service: r.pods_used_by_commercialparcel_service,
    tent: r.tent,
    burglar_alarm_systems_permits_renewals: r.burglar_alarm_systems_permits_renewals,
    business_type: r.business_type,
    mechanical_heating_air_conditioning_refrigerationair_conditioning_harv:
        r.mechanical_heating_air_conditioning_refrigerationair_conditioning_harv,
    right_of_wayuse: r.right_of_wayuse,
    bottle_club: r.bottle_club,
    uf_context_area_commercial_parking_decal: r.uf_context_area_commercial_parking_decal,
    seasonal_sales: r.seasonal_sales,
    fuel_tank_installation: r.fuel_tank_installation,
    sales_and_use_tax_permits: r.sales_and_use_tax_permits,
    fire_sprinkler: r.fire_sprinkler,
    reconstruction_of_driveway_curb_gutter_and_sidewalk: r.reconstruction_of_driveway_curb_gutter_and_sidewalk,
    driveway_commercial: r.driveway_commercial,
    decal_permitvisitor: r.decal_permitvisitor,
    decal_permit_temporary: r.decal_permit_temporary,
    banner_horizontaland_vertical: r.banner_horizontaland_vertical,
    noise: r.noise,
    decal_permit_commercial: r.decal_permit_commercial,
    special_eventparking: r.special_eventparking,
    decal_service_permit: r.decal_service_permit,
    site_work: r.site_work,
    taxicab_and_limosine: r.taxicab_and_limosine,
    decal_permitresidential: r.decal_permitresidential,
    sidewalk_caf_state: r.sidewalk_caf_state,
    sidewalk_caf_city: r.sidewalk_caf_city,
    landlord: r.landlord,
    tree_removal_residential: r.tree_removal_residential,
    eating_establishmentsserving_dogs: r.eating_establishmentsserving_dogs,
    hood_suppresion_system: r.hood_suppresion_system,
    christmas_tree_sales_lot_temporary_structures_light_poles_and_signs:
        r.christmas_tree_sales_lot_temporary_structures_light_poles_and_signs,
    peddler: r.peddler,
    food_truck: r.food_truck,
    surface_waters_wetlands_regulated_archaeological_resources: r.surface_waters_wetlands_regulated_archaeological_resources,
    certificate_of_appropriatness: r.certificate_of_appropriatness,
    automotive_dealer_licenseflorida: r.automotive_dealer_licenseflorida,
    congregating_on_street_sidewalks: r.congregating_on_street_sidewalks,
    uf_context_area_residentialparking_decal: r.uf_context_area_residentialparking_decal,
    foster_family_homesfor_children_adults: r.foster_family_homesfor_children_adults,
    family_day_care_homes: r.family_day_care_homes,
    building_residential: r.building_residential,
    driveway_residential: r.driveway_residential,
    home_occupation: r.home_occupation,
    contractor_master_certificate: r.contractor_master_certificate,
    burning: r.burning,
    group_home_personal_care: r.group_home_personal_care,
    adult_performance_establishment: r.adult_performance_establishment,
    dance_hall_permit: r.dance_hall_permit,
    pods_used_by_residential: r.pods_used_by_residential,
    decal_permit_fraternity_sororitymeal_decal: r.decal_permit_fraternity_sororitymeal_decal,
  });
  console.log('Parsed businesstype:', businessType);
  return businessType;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
/*
function extractId(personData: any) {
  let extractedId = personData.url.replace('http://swapi.co/api/people/', '').replace('/', '');
  return parseInt(extractedId, 10);
}
*/

function mapBusinessType(response: Response): BusinessType {
  // toBusinessType looks just like in the previous example
  return toBusinessType(response.json());
}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`;
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
