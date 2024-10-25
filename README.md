<h1 align="center">Jed</h1>
Jed is a blogging platform providing varied level headings, direct image insertion through image link address, interactive posts with comments.

---

1. Clone the repository:
``` bash
git clone https://github.com/amr0exe/Jed.git
```
2. Do an ```npm install ``` on in both client and server folder:

3. Start a Postgres db using docker:
```
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
# add the connection-string in .env file
# start and stop easily with docker
docker start my-postgres

npx prisma migrate deploy #to deploye prisma migations to your database
```
4. For starting the project:
```
npm run dev # on client folder

[following command requires typescript, nodemon to installed ]
tsc -b      # for transpiling ts-code
nodemon dist/index.js # for running server 
```
