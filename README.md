<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

---------------------------------Hotel Booking Application-----------------------------------
I. Overview
This project involves developing a hotel booking application with the following functionalities:

1: Authentication: Basic Auth, JWT authentication, and Google login.
2: XML Processing: Convert XML files to JSON format and expose booking information through a protected API.
3: Payment Integration: Handle payments through Vietcombank's payment gateway.

II. Design Choices

1. Authentication
   a. Basic Authentication

- Purpose: To allow users to sign up using email and password.
- Technology: Utilized NestJS’s built-in AuthModule for Basic Auth implementation.
- Details: Users provide an email and password, which are validated against stored credentials.

b. JWT Authentication

- Purpose: Secure API endpoints with JWT tokens, which are attached as HTTP-only cookies to prevent client-side script access.
- Technology: Implemented using NestJS’s JwtModule and Passport with JWT strategy.
- Details: + Access Token: Provides access to protected routes and has a short expiration time (e.g., 15 minutes). + Refresh Token: Used to obtain a new access token and has a longer expiration time (e.g., 7 days). + Token Rotation: Implemented to automatically generate a new pair of access and refresh tokens upon expiration.

c. Google Login

- Purpose: Allow users to sign in using their Google account.
- Technology: Utilized NestJS’s built-in AuthModule for Basic Auth implementation.
- Details: Users provide an email, which are validated against stored credentials..

2. XML Processing

- Purpose: Convert XML files into JSON format for easier manipulation and access.
- Algorithm: Utilizes a recursive approach to handle nested XML structures and convert them into JSON.
- Functionality:
  - Parsing: Reads XML files and parses them into a JavaScript object.
  - Conversion: Recursively processes the parsed object to construct a JSON representation.

3. Payment Integration

- API Endpoint /payment/<confirmation_no>

  - Purpose: Initiate a payment process through Vietcombank’s payment gateway.
  - Technology: Integrated with Vietcombank’s API for payment processing.
  - Details: + Payment Data: Includes parameters like amount, currency, and order_code extracted from the XML file. + Redirection: Upon successful payment, the user is redirected to the success page; otherwise, they are redirected to the failure page.

- Vietcombank API Configuration

  - Sandbox Environment: Used for testing. Endpoint: https://sandbox2.nganluong.vn/vietcombank-checkout/vcb/api/web/checkout/version_1_0
  - Live Environment: URL provided for production deployment.
  - Configuration: Includes merchant site code, passcode, and URLs for return, cancel, and notification.

III. API Endpoints

1. Authentication Endpoints

- POST /api/QuanLyNguoiDung/DangKy: Register a new user with email and password.
- POST /api/QuanLyNguoiDung/DangNhap: Authenticate users and issue JWT tokens.
- POST /api/QuanLyNguoiDung/DangNhapGoogle: Authenticate users and issue JWT tokens.

2. XML Processing:

- GET /api/XmlToJson/:confirmation_no: Convert XML files to JSON format. Secured with JWT guard.

3. Payment Endpoint

- POST /api/payment/:confirmation_no: Initiates a payment process. Redirects based on payment success or failure.

IV. Error Handling

- XML Processing Errors: Logs errors and redirects to a failure page.
- Payment Errors: Handles payment gateway errors and redirects users accordingly.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
