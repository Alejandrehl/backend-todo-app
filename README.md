## APIs

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
