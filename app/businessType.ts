import { Permit } from './permit';

export interface BusinessType {
    business_category: string;
    business_type: string;
    requiredPermits: Permit[];
    conditionalPermits: Permit[];
    collapsed: boolean;
    // Many additional properties on business type that define some details
    // as strings but aren't used by the app in a significant way
    [propName: string]: any;
}
