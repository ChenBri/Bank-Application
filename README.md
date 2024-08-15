<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="./Front/src/logo.svg">
    <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Chen's Bank</h3>

  <p align="center">
    This project allows users to register for a banking service with secure authentication and verification. Once registered, users can send payments to other users on the platform and view a their transactions.
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project
[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project allows users to register for a banking service with secure authentication and verification. Once registered, users can send payments to other users on the platform and view a list of their most recent transactions.

### The project is divided into three main components:

1. **Frontend**: Built using React, TypeScript, MaterialUI, and TailwindCSS.
2. **Backend**: Developed with Express (Node.js) and includes Nodemailer for sending custom emails, NodeCron for scheduled tasks, and Mongoose for MongoDB interactions.
3. **Database**: MongoDB, integrated through the Mongoose driver.
The backend exposes a RESTful API, which was designed using Swagger and tested with Postman. The API includes the following endpoints:

### RestFUL API:
* **register** (POST): Registers a new user with email and password.
* **balance** (GET): Retrieves the current balance of the authenticated user.
* **authenticate** (GET): Verifies the email and password, then stores the JWT in cookies.
* **transactions** (GET/POST): Retrieves the list of transactions or records new ones.
* **verify** (POST): Confirms the user's email using a verification code sent via email.
* **status** (GET): Checks the server status.
* **logout** (DELETE): Removes the JWT token from the cookies.

All critical operations, such as transactions and balance retrieval, are validated on the backend by checking the JWT's authenticity.

### Overview:
The frontend communicates with the backend via Axios for all API requests. When a user registers, an email is sent to their address using Nodemailer, containing a verification link that remains valid for 24 hours. In the backend, a cron job runs every few hours to delete unverified email addresses that are older than 24 hours.

The website is fully responsive, with TailwindCSS as the primary styling framework.



## Built With
[![React][React-logo]][React-url]
[![Typescript][Typescript-logo]][Typescript-url]
[![MaterialUI][MaterialUI-logo]][MaterialUI-url]
[![TailwindCSS][TailwindCSS-logo]][TailwindCSS-url]
[![Express][Express-logo]][Express-url]
[![Swagger][Swagger-logo]][Swagger-url]
[![MongoDB][MongoDB-logo]][MongoDB-url]
[![Mongoose][Mongoose-logo]][Mongoose-url]
[![Postman][Postman-logo]][Postman-url]
[![Figma][Figma-logo]][Figma-url]

## Getting Started


Before you begin, ensure you have the following installed on your machine:

Node.js: The project is built using Node.js, so you'll need to have it installed.
npm: Node Package Manager is included with Node.js. Ensure you have the latest version installed by running:
```sh
npm install npm@latest -g
```

```sh
git clone https://github.com/your-username/chen-bank.git
```
Navigate to the project directory:

```sh
cd chen-bank
npm install
```

### Create a .env file
Create a .env file in the root directory and add the necessary environment variables for MongoDB connection, JWT secret, email credentials for Nodemailer, etc. Example:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### Run the application:

To start both the frontend and backend, you can use the following command:

```sh
npm start
```
The frontend should now be running on http://localhost:3000, and the backend on http://localhost:5000.


[React-logo]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Typescript-logo]:https://img.shields.io/badge/Typescript-323330?style=for-the-badge&logo=typescript&logoColor=f0db4f
[Typescript-url]: https://www.typescriptlang.org/

[MaterialUI-logo]: https://img.shields.io/badge/MUI-42a5f5?style=for-the-badge&logo=mui&logoColor=white
[MaterialUI-url]: https://mui.com/

[TailwindCSS-logo]: https://img.shields.io/badge/tailwind-6d28d9?style=for-the-badge&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/

[Express-logo]: https://img.shields.io/badge/express-06b6d4?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/

[Swagger-logo]: https://img.shields.io/badge/swagger-47c5c4?style=for-the-badge&logo=swagger&logoColor=white
[Swagger-url]: https://swagger.io/

[MongoDB-logo]: https://img.shields.io/badge/mongodb-3F3E42?style=for-the-badge&logo=mongodb&logoColor=3FA037
[MongoDB-url]: https://www.mongodb.com/

[Mongoose-logo]: https://img.shields.io/badge/Mongoose-881100?style=for-the-badge&logo=Mongoose&logoColor=white
[Mongoose-url]: https://mongoosejs.com/

[Postman-logo]: https://img.shields.io/badge/Postman-E86837?style=for-the-badge&logo=Postman&logoColor=white
[Postman-url]: https://www.postman.com/

[Figma-logo]: https://img.shields.io/badge/Figma-a259ff?style=for-the-badge&logo=Figma&logoColor=1abcfe
[Figma-url]: https://www.figma.com/
