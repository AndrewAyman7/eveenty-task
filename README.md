Setup (Local): 
npm install
set .env with
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/eveenty_task
JWT_SECRET=....
STRIPE_SECRET_KEY=....

run npm run migrate, then npm start.

Setup (Docker): 
Navigate to project folder
run docker-compose up --build
test at http://localhost:3000/auth/signup.

Run Instructions: Local: npm start, Docker: docker-compose up.


A Postman Collection with all endpoints is available here:
https://.postman.co/workspace/My-Workspace~b515df06-65f2-43ef-8ecc-33c04f01fda4/collection/20396609-959d4a8e-dde9-4305-967f-2b9cd14714c7?action=share&creator=20396609
