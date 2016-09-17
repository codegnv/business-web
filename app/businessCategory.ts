import { BusinessType } from './businessType';

export class BusinessCategory {
  name: string;
  businessTypes: BusinessType[] = [];

  constructor(name: string) {
      this.name = name;
  }

  add(businessType: BusinessType) {
      this.businessTypes.push(businessType);
  }
}
