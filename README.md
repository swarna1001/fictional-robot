## Inventory-Hub - One-step solution to manage and track Inventories

### Tech Stack
1. SST [Serverless Stack](https://sst.dev/) - A framework that makes it easy to build modern full-stack applications on AWS.
2. [PlanetScale](https://planetscale.com/) - A MySQL-compatible serverless database.
3. [Drizzle ORM](https://orm.drizzle.team/) - A TypeScript ORM for SQL databases.
4. React.js
5. [Mantine](https://mantine.dev/) - A component library for React
6. [React-Query](https://tanstack.com/query/latest/) - For data fetching and state management
7. Node.js
8. TypeScript

Access the project - https://d2oz28sjjhna8e.cloudfront.net/

The project is built using SST and uses native Auth Construct with Google as the provider.

### Features
1. The application has two roles, Manager and Assistant. A manager can create, delete and approve inventories created by the assistant.
2. An assistant can view the information.
3. The dashboard also shows a few analytics/stats based on the data.
<img width="1420" alt="Screenshot 2023-08-09 at 1 00 40 PM" src="https://github.com/swarna1001/fictional-robot/assets/66565400/7117c636-652d-45de-8c34-213765cbab4b">


### Folder Structure

```
-- fictional-robot
    |-- packages
        |-- core
            |-- migrations
            |-- src
                |-- schema
                    |-- schema.ts
            |-- drizzle.config.json
            |-- package.json
            |-- sst-env.d.ts
            |-- tsconfig.json
       |-- functions
           |-- src
               |-- addInventory.ts
               |-- auth.ts
               |-- deleteInventory.ts
               |-- migration.ts
               |-- session.ts
               |-- updateInventory.ts
               |-- updateUserRole.ts
           |-- utils
               |-- db.ts
           |-- package.json
           |-- sst-env.d.ts
           |-- sconfig.json
       |-- web (A React app created using Vite)
       |-- stacks
           |-- MyStack.ts
       |-- .gitignore
       |-- README.md
       |-- package.json
       |-- pnpm-lock.yaml
       |-- pnpm-workspace.yaml
       |-- sst.config.ts
       |-- tsconfig.json  
```
1. It's a mono repo.
2. packages/functions - backend functions
3. packages/core - shared business logic (DB schema and migrations file)
4. packages/web - frontend code. Here, we have a React application created with Vite. It's already wired up to be able to talk to the API.
5. stacks/ - contains the app's infrastructure as defined as code. Or what is known as Infrastructure as Code (IaC). SST by default uses TypeScript to define your infrastructure.
6. SST ships with Auth — a modern lightweight authentication library. It is made up of the following pieces:
   - Auth - a construct that creates the necessary infrastructure like the API routes to handle the authentication flows.
   - AuthHandler -  Lambda function that can handle authentication flows for various providers. 
   - Session — a library for issuing and validating authentication sessions in our Lambda function code.

### Implementation
1. The application features two tables, Users and Inventory.
2. CRUD APIs to add, delete and approve inventory and also update user roles.
3. I started with setting up the PlanetScale database, creating a User table then building the authentication (both FE and BE) followed by building the other APIs and their frontend counterparts.

### Issues encountered
1. I have been playing with SST for some time and decided to use its inbuilt solution for Auth. Things turned out to be a little wobbly and there is also a lag between the database update (especially for the user) and the authenticated session being returned. I tried to dig into it and my best guess is that the session is being cached by SST.
2. In case, after signing in, you are stuck on the Update Roles page. Clear your cookies and start again by signing in. It won't ask you to add your role again and will take you to the dashboard.
3. I am also adding two test Google accounts.
   - Assistant Role
     roleassistant@gmail.com
     Password - Assistant@10
   - Manager Role
     managerrole82@gmail.com
     Password - Manager@10
4. I also encountered this issue - "Access to XMLHttpRequest at 'https://sp3o5ohu78.execute-api.us-east-1.amazonaws.com/inventory/2/' from origin 'http://localhost:5173' has been blocked by CORS policy: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response" while building PUT and DELETE API's and I am not sure if this is because of SST. I had never encountered this problem before. To make things work, I changed those methods to POST.

