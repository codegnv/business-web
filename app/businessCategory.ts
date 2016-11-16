import { BusinessType } from './businessType';

export interface BusinessCategory {
    readonly name: string;
    businessTypes: BusinessType[];
}
