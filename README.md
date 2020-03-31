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
