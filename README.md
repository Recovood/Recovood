# Recovood
Get your healthy food with a discounted price here.
![poster1](https://user-images.githubusercontent.com/67887501/97043274-66e07680-159c-11eb-83f2-f2dfb182682a.png)
![poster2](https://user-images.githubusercontent.com/67887501/97043279-68aa3a00-159c-11eb-9c2b-3d41b1d65387.png)
### N.B.
- All cd are relative to this following pwd
  ```
  Recovood/
  ```

### List of commands for preparation
- Create Database
  ```
  cd server/services/cart
  ```
  ```
  sequelize db:create
  ```
- Create Migrations
  ```
  cd server/services
  ```
  ```
  npm run migration
  ```
- Seeding Database
  ```
  cd server/services
  ```
  ```
  npm run seeding
  ```
- Drop Database (_* Disconect your Postgres first_)
  ```
  cd server/services
  ```
  ```
  npm run database-drop
  ```

### List of commands for running the app
- Turning the user server on
  ```
  cd server/services/user
  ```
  ```
  nodemon bin/www 
  ```
  ```
  nodemon app.js
  ```
- Turning the food server on
  ```
  cd server/services/food
  ```
  ```
  nodemon bin/www 
  ```
  ```
  nodemon app.js
  ```
- Turning the restaurant server on
  ```
  cd server/services/restaurant
  ```
  ```
  nodemon bin/www 
  ```
  ```
  nodemon app.js
  ```
- Turning the cart server on
  ```
  cd server/services/cart
  ```
  ```
  nodemon bin/www 
  ```
  ```
  nodemon app.js
  ```
- Turning the orchestrator on
  ```
  cd server/orchestrator
  ```
  ```
  nodemon app.js
  ```
- Turning the client on
  ```
  cd client
  ```
  ```
  npm start
  ```

### List of commands for testing
- Create Database
  ```
  cd server/services/cart
  ```
  ```
  sequelize db:create --env development
  ```
- Create Migrations Test
  ```
  cd server/services
  ```
  ```
  npm run migration-test
  ```
- Run Test
  ```
  cd server/services
  ```
  ```
  npm run test
  ```
- Drop Database Test (_* Disconect your Postgres first_)
  ```
  cd server/services
  ```
  ```
  npm run database-drop-test
  ```
