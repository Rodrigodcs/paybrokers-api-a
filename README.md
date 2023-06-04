# PayBrokers challenge

This challenge involves creating two APIs that communicate using RabbitMQ.

The first API receives products via a POST route, saves these products in the database if they don't already exist, and then sends the product to a RabbitMQ queue.

The second API receives products from the RabbitMQ queue and saves them in its own database if they don't exist. It also has a GET route for viewing the products in the database.

## How to run

2. Clone the API-A repository, available at: https://github.com/Rodrigodcs/paybrokers-api-a

1. Clone this repository (API-B)

3. Create a .env file based on .env.example

4. To create the mongodb and rabbitmq containers, run the following command from API-A:
```bash
docker-compose up -d
```

5. Install dependencies on API-A and API-B:
```bash
npm i
```

6. Input the following command on API-A and API-B:
```bash
npm start
```
7. If done based on .env.example:
 - API-A and API-B will be listening on PORTs 3000 and 3001, respectively.
 - To access rabbitmq, insert `http://localhost:15672/` to the web browser: username: guest /password: guest
 - The mongo database will be running on PORT 4000

## Funcionalities

### API-A
 - POST /products

 Route used to send product information to API-A

 ```json
//Body
  "name": (string, required),
  "value": (number, required),
  "description": (string, optional)
```

### API-B
 - GET /products/:page

This route returns an array of up to 10 products.
The path parameter "page" indicates which page of products will be returned.
This route can also receive a query parameter "search" that will filter the results to match it.
