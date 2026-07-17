# AllConverterHub API

Spring Boot 3 / Java 17+ backend for accounts and future platform features. It uses MongoDB with Mongock migrations, JWT access and refresh tokens, and SMTP email flows.

## Run locally

```bash
cd backend
cp .env.example .env
docker compose up -d
export MONGODB_URI="mongodb://localhost:27017/allconverterhub"
export FRONTEND_URL="http://localhost:3000"
export JWT_SECRET="$(openssl rand -base64 48)"
./mvnw spring-boot:run
```

If Maven Wrapper is not present in your environment, run `mvn spring-boot:run` instead. Mailpit receives local emails at `http://localhost:8025`.

## API contract

Swagger UI: `http://localhost:8080/api/v1/docs`  
OpenAPI JSON: `http://localhost:8080/api/v1/v3/api-docs`

Authentication endpoints:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/verify-email?token=...`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

The frontend should keep access tokens in memory and refresh tokens in a secure, HttpOnly cookie once the frontend integration begins. Do not place tokens in local storage in production.
