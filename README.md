# Transaction backend api

This is a simple backend API built with Go, PostgreSQL, and Redis, running in Docker containers. It supports horizontal scaling of the backend service and uses environment variables for configuration.

---

## Features

* REST API endpoints
* PostgreSQL database
* Redis caching
* Load-balanced backend and rate-limited endpoints using Nginx
* Easy to scale backend containers (docker compose)

---

## Project Structure

```
src
├── app.module.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── decorators
│   │   ├── auth.decorator.ts
│   │   ├── roles.decorator.ts
│   │   └── user.decorator.ts
│   ├── dto
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   └── guards
│       ├── ownership.guard.ts
│       ├── redis-auth.guard.ts
│       └── roles.guard.ts
├── common
│   ├── all-exceptions.filter.ts
│   └── logging.interceptor.ts
├── main.ts
├── redis
│   ├── redis.module.ts
│   └── redis.service.ts
├── transactions
│   ├── dto
│   │   └── filter-transaction.dto.ts
│   ├── transaction.controller.ts
│   ├── transaction.model.ts
│   ├── transaction.module.ts
│   └── transaction.service.ts
└── users
    ├── user.model.ts
    ├── users.controller.ts
    ├── users.module.ts
    └── users.service.ts
```

---

## Environment Variables

The backend reads configuration from environment variables (I am giving environment in docker compose but not using for now for ease to use):

| Variable      | Description              | Example    |
| ------------  | ------------------------ | ---------- |
| DB_HOST       | PostgreSQL host          | postgres   |
| DB_PORT       | PostgreSQL port          | 5432       |
| DB_USER       | PostgreSQL username      | myuser     |
| DB_PASSWORD   | PostgreSQL password      | mypassword |
| DB_NAME       | PostgreSQL database name | mydb       |
| REDIS_HOST    | Redis host               | redis      |
| REDIS_PORT    | Redis port               | 6379       |
| REDIS_PASSWORD| Redis password           | mypassword |

---

## Running with Docker Compose

1. Make sure Docker, Docker Compose and Git are installed.
2. Clone repository with 
 * git clone https://github.com/hamzakaya5/transaction_api.git
3. Build and start all services:

```bash
docker compose up --build
```

4. Optional: Run in detached mode:

```bash
docker compose up --build -d
```

5. Scale backend containers:

```bash
docker compose up --scale backend=3 -d
```

---

## Accessing the API

* By using postman collection in the repository, it can easyly be used. Authentication and transaction endpoint are given in the collection.
  - Import collection from postman
  - Register with a username and email
  - login with that username
  - Use the token coming from response of login request for transaction requests.
* Backend API: `http://localhost:8080`
* Nginx will load-balance requests to multiple backend containers. Nginx also will apply rate limiting (right now it is 10requests/second)
* PostgreSQL and Redis are accessible to backend containers by their service names (`postgres`, `redis`). We cannot reach from outside of the network.

## Stopping and Removing Containers

```bash
docker compose down
```

---

## Notes

* When user is created, it automaticaly assigns a role to the user. (Admin or Vendor and it can be developed by adding one endpoint for admins to use. So, they can give admin permissions to another users.)

* Endpoints for listing all transactions requires admin privilage. Users can only see their own transactions if they are vendor.
* Filter endpoint is used for filtering with necessary informations and admin can see all the transactions with filtering, but vendors only see their transactions.
