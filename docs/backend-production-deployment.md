# Deploy the AllConverterHub API

This guide deploys the Spring Boot API to Render, MongoDB to MongoDB Atlas, and email through Resend SMTP. The Next.js frontend remains on Vercel.

## 1. Create a MongoDB Atlas database

1. Create a MongoDB Atlas account and create an M0 free cluster.
2. Create a database user with a strong password.
3. In **Network Access**, allow access from `0.0.0.0/0`. A hosted Render service does not have a fixed outbound IP address on its free plan.
4. Click **Connect** > **Drivers** and copy the connection string.
5. Replace `<password>` and use `allconverterhub` as the database name. Store this value only as `MONGODB_URI` in Render.

## 2. Configure email

1. Create a Resend account and verify a sender email or domain.
2. Create a Resend API key.
3. Use `smtp.resend.com`, port `587`, and username `resend`.
4. Use the verified sender address as `MAIL_FROM`.

## 3. Deploy with Render

1. Merge this change to `main`.
2. In Render, select **New** > **Blueprint** and connect `kumarmanoj396/allconverterhub`.
3. Create the Blueprint using the repository-root `render.yaml`.
4. Set the required environment variables:

   - `MONGODB_URI`: Atlas connection string
   - `JWT_SECRET`: generate with `openssl rand -base64 48`
   - `MAIL_PASSWORD`: Resend API key
   - `MAIL_FROM`: verified sender, for example `AllConverterHub <no-reply@your-domain.com>`

5. Deploy and copy the public Render URL.
6. Verify the health endpoint:

   ```text
   https://YOUR-RENDER-SERVICE.onrender.com/api/v1/auth/health
   ```

## 4. Connect Vercel

In Vercel > **Settings** > **Environment Variables**, set this production variable and redeploy:

```text
NEXT_PUBLIC_API_BASE_URL=https://YOUR-RENDER-SERVICE.onrender.com/api/v1
```

## Production checklist

- Do not commit `.env`, `.env.local`, API keys, database URLs, or JWT secrets.
- Set `FRONTEND_URL` to `https://allconverterhub.vercel.app` without a trailing slash.
- Test registration, email verification, login, logout, and password reset from the Vercel website.
- Render's free service may take longer on its first request after idle time.
