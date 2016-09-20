# business
Make it easier to start a business

## Model Permit sites
https://businessportal.sfgov.org/permits-licenses

## Possible opendata service

https://data.cityofgainesville.org/Economic-Development-Redevelopment/Permits-by-Business-Type/pp75-zh6w

https://data.cityofgainesville.org/dataset/Permit-Table-TEST-for-C4GNV-/mfe4-6q3g

## JSON Source data for associations, maintained by the city

https://data.cityofgainesville.org/resource/pp75-zh6w.json

https://data.cityofgainesville.org/resource/mfe4-6q3g.json

### Architecture Diagram

![Alt text](https://cloud.githubusercontent.com/assets/1063707/17459516/b22d5afa-5c09-11e6-8b37-dce38b9515ce.png "Architecture Diagram")

TODO: Figure out why so many requests are being made...this is copied from an angular 2 quickstart code example

### Data Structures

#### BusinessCategory
This is used to group various types of businesses together for filtering.
The schema of a BusinessCategory is as follows:
```
name: string;
businessTypes: BusinessType[];
```

#### BusinessType
This is the type of business that a person is trying to open. These are defined by the city of gainesville.
The schema for a BusinessType is as follows:
```
business_type: string;
business_category: string;
permits: Permit[];
```

#### Permit
This is a permit that is required for a particular BusinessType.
The schema for a Permit is as follows:
```
friendly_name: string;
url: {
    url: string;
};
permit_name: string;
```

The permit locator page makes two http requests to Socrata (see above URLs) and generates an array of BusinessCategory structures.
This structure is populated with types and permits from Socrata.
