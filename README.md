[![Build Status](https://travis-ci.org/c4gnv/business-web.svg?branch=develop)](https://travis-ci.org/c4gnv/business-web)

# Latest Dev Build
[http://bdev.c4gnv.com.s3-website-us-east-1.amazonaws.com/](http://bdev.c4gnv.com.s3-website-us-east-1.amazonaws.com/)

# Business Portal
C4GNV is a member brigade of Code for America, the goal of this project is to make it easier
to start a business in Gainesville by providing people easy access to permits and zoning information.
The project is a lightweight website written in [Typescript](https://www.typescriptlang.org/) and Angular 2, using open data sources as a persistent backend.

The inspiration for this service is to eventually be able to expand to be like the
[Business Portal for San Francisco](https://businessportal.sfgov.org/), however we're
starting with the [Permit Locator](https://businessportal.sfgov.org/permits-licenses) functionality only.

## Contributing

We welcome your contribution! Please see our
[contributing guidelines](https://github.com/c4gnv/business-web/blob/develop/CONTRIBUTING.md).

## Install
You want to run this bad boy locally?  Let's do it.

###Install Tools
* Install nodejs from https://nodejs.org/en/

* Install npm from https://www.npmjs.com/
 * It is suggested that you use [yarn](https://yarnpkg.com/)
  as an alternative to `npm` for package management.
  If you don't already have it installed, you can
  follow [yarn's own documentation](https://yarnpkg.com/en/docs/install)
  to install it. The documentation for the business portal will refer to
  `yarn` in place of `npm`, but they can be used in the
  same way.

* Install the latest version of GIT from https://git-scm.com/

###Get That Repo
From the command line execute `git clone https://github.com/c4gnv/business-web.git` to get this repository down to your local machine

###Install the Dependancies
Run `yarn install` in the project's root directory

###Start it up
Run `yarn start` and head over to http://localhost:8080/ you should now see the latest and greatest.

#How This all Fits Together
=======
## Model Permit sites
https://businessportal.sfgov.org/permits-licenses

## Possible opendata service

[Permits by business type](https://data.cityofgainesville.org/Economic-Development-Redevelopment/Permits-by-Business-Type/i9px-haju)

[Permit Details](https://data.cityofgainesville.org/dataset/Permit-Table-TEST-for-C4GNV-/mfe4-6q3g)

## JSON Source data for associations, maintained by the city

[Business Types](https://data.cityofgainesville.org/resource/i9px-haju.json)

[Business Permits](https://data.cityofgainesville.org/resource/mfe4-6q3g.json)

### Architecture Diagram

![Alt text](https://cloud.githubusercontent.com/assets/1063707/17459516/b22d5afa-5c09-11e6-8b37-dce38b9515ce.png "Architecture Diagram")

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
requiredPermits: Permit[];
conditionalPermits: Permit[];
```

#### Permit
This is a permit that is required for a particular BusinessType.
The schema for a Permit is as follows:
```
friendly_name: string;
permit_location: {
    url: string;
};
permit_name: string;
```

The permit locator page makes two http requests to Socrata (see above URLs) and generates an array of BusinessCategory structures.
This structure is populated with types and permits from Socrata.
