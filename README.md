<h1 align="center">Jed</h1>

### Table of contents
---

1. Clone the repository:
``` bash
git clone https://github.com/amr0exe/Jed.git
```
2. Do an ```npm install ``` on in both client and server folder:

3. Start a Postgres db using docker:
```
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
# add the string in .env file
# start and stop easily with docker
docker start my-postgres

npx prisma migrate dev #to deploye prisma migations to your database
```
4. For starting the project:
```
npm run dev # on client folder

tsc -b      # for transpiling ts-code
nodemon dist/index.js # for running server 
```
