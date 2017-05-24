import { Permit } from './permit';

export interface BusinessType {
    readonly business_category: string;
    readonly business_type: string;
    readonly business_description: string;
    requiredPermits: Permit[];
    conditionalPermits: Permit[];
    collapsed: boolean;
    // Many additional properties on business type that define some details
    // as strings but aren't used by the app in a significant way
    [propName: string]: any;
}
