# CivicFix by Manuel Suarez
### JavaScript | Node.js | Express | Handlebars (HBS) | MongoDB (Mongoose) | REST API | Postman API | Visual Studio Code

# Summary
CivicFix is a merchant website application specializing in exclusive Honda Civic parts. 
Clients can browse and purchase parts, while employees manage and modify inventory stored in the MongoDB database. 
The app includes a development user role for testing API endpoints. 
Additional features include automatic cart creation and deletion, enabled by the cron module for scheduled tasks.

# Dependencies
- Express: Provides web functionality.
- Nodemon: Facilitates ease of development.
- HBS (Handlebars): Simplifies HTML rendering.
- Concurrently: Allows simultaneous app deployment.
- Cron: Enables scheduled tasks, such as automatic cart cleanup.
- Dotenv: Manages environment variables, including MongoDB connection strings.
- Mongoose: Provides MongoDB connection functionality.
  
# Instructions
- Download modules by running "npm install".
- Seed the database by running "npm run seed".
- Start the server with "npm run dev".
- Use the following credentials for basic management:
  - Username: employee | Password: employee1234
  - Username: dev | Password: dev1234 (for API endpoint access)

# Features
- User Authentication
- Part Management
- API implementation

# Business Rules
- Only dev users can access API endpoints.
- Only non-logged-in users can make purchases.
  
# Demo
https://github.com/ManuelSuarez3D/CivicFix_ManuelSuarez/assets/82544173/07ccd1db-7d75-4375-bc41-908ffd44c9f9


