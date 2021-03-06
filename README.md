# Nestjs-starter-kit

Backend starter-kit for a MEAN stack app

## Content

- NestJS (generated from CLI)
- Bcrypt
- Mongoose
- Passport
- Swagger & Swagger-UI (/api-docs)
- Prettier (
```npm run format```
)

### Prebuild code

- Cors
- Error Handling with logging for HttpException
- CustomError
- Users module (with role)
- Authentification with local/jwt strategy
- Basic CRUD (Settings) with Authorization

## Initialize from this repo

- Clone this repository
- ```sh
  npm install
  ```
- Replace the README.md name/content
- Change the package.json/package-lock.json "name"
- Create a .env file at the root level with the followings:
  - MONGOBD_STRING: string to connect to your mongoDB cluster
  - CORS_ORIGIN: arrays of urls authorized to access your application
  - JWT_ISSUER: jwt issuer
  - JWT_SECRET: jwt secret
  - BCRYPT_ROUND: number of round to use for the bcrypt.gensalt
  - PORT: port of the application

## Run the server (dev)

```sh
npm run start:dev
```
For all the run config, see the package.json
