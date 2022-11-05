# Blog App REST API

Backend server for Blog Ap.

To run the application

1. Clone this repo
2. Run `npm install`
3. Run `npm start`

## Built With

* Node.js
* Express.js
* PstgreSQL
* Knex
* Bcrypt
* JSON Web Token

## Environmental Variables

### Database URL

You must add your MongoDB url `PG_DATABASE_URL` in the `index.js`

if you are using local postgres database you can use the following:

`PG_DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}`


### JSON Web Token secret key

Add the JWT secret `JWT_SEC` in `controllers/auth.js` and `controllers/post.js` 


## Deployment
Deployed on 


## Authors

- **Ali Darraji** - [https://github.com/adarraji](https://github.com/adarraji)
