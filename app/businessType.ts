import { Permit } from './permit';

export interface BusinessType {
    business_category: string;
    business_type: string;
    sign?: string;
    site_plan?: string;
    eating_establishmentsserving_dogs?: string;
    permits: Permit[];
    [propName: string]: any;
}
