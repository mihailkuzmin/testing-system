# About project
It's a clone of codewars/hackerrank/leetcode, but for students in my university
<br />
**DEMO**: http://51.15.239.35
<br />
Admin credentials: <code>admin:admin</code>
<br />
Common user credentials: <code>user:user</code>

## How to use
1. Login as admin
2. Create groups of students
3. Create students
4. Create tasks and tests
5. Combine different tasks into one work
6. That's all. Login as common user and enjoy coding

## How to set up on linux
1. Clone repo <code>git clone https://github.com/mihailkuzmin/testing-system </code>
2. Install dependencies <code>npm install</code>
3. Build frontend <code>npm run build:client</code>
4. Build backend <code>npm run build:server</code>
5. Install PostgreSQL
6. Init database with <code>setup</code> & <code>init</code> scripts from <code>dist/backend/server/db</code>
7. Configure <code>nginx</code> for serving frontend from <code>dist/frontend</code>
8. Add nginx <code>proxy_pass</code> for <code>/api</code> routes to the address that backend listening 
(default is <code>localhost:5000</code>)
9. Configure a server with <code>config.json</code>

## Run
Now you can run server with **node**: <code>cd dist/backend/server && node -r tsconfig-paths/register index.js</code>
<br />
or use **pm2**: <code>cd dist/backend/server && pm2 start index.js --node-args="-r tsconfig-paths/register"</code>