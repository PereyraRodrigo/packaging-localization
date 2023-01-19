# waypoint-site
Waypoint new site

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Install dependencies.
```sh
  npm i
  ```

### Run the project
```sh
  ng serve -o
  ```
  
### Run Server-side rendering 
```sh
  npm run dev:ssr
  ```

### Setup for Serveless

#### Requirements
- AWS CLI installed
- AWS credential in .aws

Install the serverless package globally
```shell
npm install -g serverless
```

#### Build 
```shell
npm run build:ssr
```

#### Deploy in production
```shell
sls deploy
```

### Deploy in Dev 
```shell
sls deploy --stage test
```


You'll have tp invalidate CloudFront's cache with /*

Prod cache E19L6TJRRAFK5Z
Dev cache E2TSIC1W2S1WWC






