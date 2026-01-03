# Authentication — FlatMate (MVP)

This document describes the authentication design for the FlatMate MVP.  
The objective is to ensure **secure access**, **email authenticity**, and a **smooth first-time user experience**, while keeping the system extensible for future features.

![FlatMate Authentication Feature](./images/authenticationFlow_v1.png)
---

## 1. Scope 

Authentication in FlatMate is responsible for:
- User identity
- Secure signup and login
- Session management

It explicitly does **not** handle:
- Location or address data
- User preferences
- Property listings
- Matching, chat, or payments

---

## 2. Supported Authentication Methods

FlatMate supports the following authentication methods:

1. **Email + Password (Credentials)**
2. **Google OAuth**

All methods are unified under a single session system.

---

## 3. Signup Flow (Two-Step, Enforced)

Signup is intentionally split into two mandatory steps to balance **security** and **user experience**.

### Step 1: Email Verification
- User enters their email address
- A verification link is sent
- The user cannot proceed until the email is verified
- Verification state is stored temporarily (Redis)
- No user record is created at this stage

### Step 2: Account Details
- User sets a password and provides basic required details
- On submission:
    - Backend verifies email verification status
    - Password is securely hashed
    - User is created in the database
    - Verification token/state is invalidated

Signup is considered complete only after this step.

---

## 4. Automatic Login After Signup

After a successful signup:
- The user is automatically logged in programmatically
- A session is created using the same credentials
- No additional login form is shown

This ensures a seamless transition from signup to the main application.

---

## 5. Login Flow

### Credentials Login
- User logs in using email and password
- Backend verifies:
    - user existence
    - password validity
    - email verification status
- A session is created on success

### Google Login
- OAuth-based authentication
- Email is treated as verified by default
- If the user does not exist:
    - a new user is created
- If the user exists:
    - login proceeds directly

---

## 6. Session Management

- Sessions are managed using NextAuth
- JWT-based, stateless sessions
- Secure HTTP-only cookies
- Scalable and production-safe

---

## 7. Database Design (Authentication Only)

### Users Table
```text
id
email (unique)
password_hash
email_verified
auth_provider
created_at
