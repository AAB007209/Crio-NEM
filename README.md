# Crio-NEM
This Repository contains the code for the Node Express and MongoDB learning

## Session 1
- Exploring the Basics of HTTP Server Creation. 

## Session 2
- Using Express to Create a Server.
- Learnt about Controllers file structure and its usage.
- Using module for Importing and exporting instead of require.

## Session 3 and Session 4
- Learnt about Validations using JOI npm package.
- Learnt Config and Routes file structure system.
- Learnt about Authorization using dotenv package.
- (Session 4): Adding Middleware (Very Important).

## Session 5
- Interacting with Data in Database (MongoDB).
- Learnt about various commands to interact with MongoDB using its shell mongosh.
- Created all the Necessary basic structures to interact with MongoDB (Schema and Models).
- Creating a new Blog entry into the Database (Create).

## Session 6 (CRUD Operations)
- Reading all the Blogs + Reading particular Blog by its Id (Read).
- Updating the Blog with its Id.
- Deleting the Blog from its Id.
- Created a middleware function findBlogWithId applied to GET, PATCH and DELETE methods in router.

## Extra Session-1 (Session 6)
- Adding Validations to Data Model Schema fields using Validator Package. We can create our own Validate function using Mongoose Package.
- Learnt how to use Regular Expression (RegExp) for searching. Created new route `/blogs/search?...` for getting blogs using title and author.
- Made use of MongoDB Query Operators (Logical Query Operator `$and`, Array Query Operator `$elemMatch`)

## Session 7 
- Debugging the Errors in the Nodejs blog Activity. Understood how to proceed with the flow of the Architecture to check for the potential errors.

## Session 8
- Q-kart Backend Intro
- Disfo (Frontend & Backend) Initial Setup.
  - Created two routes `/auth/signup` and `/auth/login`

## Session 9
- Created an AuthService for the signup service.
- postSignup function for creating a new user.
- Added ValidateUser validation to `/auth/signup` route.
- Used Bcrypt package for Hashing passwords.
- ComparePassword function using bcrypt.compare() to validate the user password.

## Session 10
- Used JWT (jsonwebtoken) package for the stateless check for user logged in or not. For generating and verifying the JWT two functions created.
- Created a JWT authorize middleware `authorize-jwt.middleware.js`.
- Used Passport.js package for Authorization step instead of JWT Verify.

## Session 11
- Q-kart Backend Module 1 Debrief
- Some Interview Questions

## Sprint End Summary
- Understood the Basics of Node, Express and MongoDB very well.
- Start building Full stack projects.
- Build Minor projects to start with and expand on those later.
