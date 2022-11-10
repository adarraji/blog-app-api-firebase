# Blog App REST API

Backend server for [Blog Frontend Web application](https://github.com/adarraji/blog-app).


Created using Node.js, Express.js and PstgreSQL. This server inlcudes Node.js CRUD operations and fetching with PstgreSQL queries . Also to provide security, This server uses JSON Web Token and verify user requests.


To run the application

1. Clone this repo
2. Run `npm install`
3. Run `npm start`
<br/>

## Built With

* Node.js
* Express.js
* PstgreSQL
* Knex
* Bcrypt
* JSON Web Token
* Multer
<br/>

## Environmental Variables

### Database URL

Add your PstgreSQL url `PG_DATABASE_URL` in the `index.js`

if you are using local postgres database you can use the following:

`PG_DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}`


### JSON Web Token secret key

Add the JWT secret `JWT_SEC` in `controllers/auth.js` and `controllers/post.js` 


## Deployment
Deployed on 


## Authors

- **Ali Darraji** - [https://github.com/adarraji](https://github.com/adarraji)
