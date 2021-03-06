### [Deploy on Heroku](https://www.joshmorony.com/deploying-a-production-nestjs-server-on-heroku/)

## Entities / Models

1. User
2. Task

## APIs

### Register & Login will return JWT

1. Register:

   - METHOD: POST
   - ROUTE: `/users`
   - BODY:
     - name: string
     - lastname: string
     - email: string
     - password: string

2. Login:

   - METHOD: POST
   - ROUTE: `/auth`
   - BODY:
     - email: string
     - password: string

### Load user should get jwt through url parameters

3. Load user:

   - METHOD: GET
   - ROUTE: `/auth/:token`

4. Create Task:

   - METHOD: POST
   - ROUTE: `/tasks`
   - BODY:
     - userId: number
     - title: string
     - description: string

5. Get all task by userId:

   - METHOD: GET
   - ROUTE: `/tasks/user/:userId`

6. Get Task By Id:

   - METHOD: GET
   - ROUTE: `/tasks/:id`

7. Delete Task By Id:

   - METHOD: DELETE
   - ROUTE: `/tasks/:id`

8. Update Task By Id:
   - METHOD: PUT
   - ROUTE: `/tasks/:id`
   - BODY:
     - title: string
     - description: string
