# About project
It's a clone of codewars/hackerrank/leetcode, but for students in my university

## How to use:
1. Login as admin
2. Create groups of students
3. Create students
4. Create tasks and tests
5. Combine different tasks into one work
6. That's all. Login as common user and enjoy coding

## How to set up on linux:
<code>git clone https://github.com/mihailkuzmin/testing-system </code>
<br />
<code>npm install</code>
<br />
<code>npm run build:client</code>
<br />
<code>npm run build:server</code>
<br />
<code>install postgresql</code>

## Run:
1. Configure <code>nginx</code> for serving frontend from <code>dist/frontend</code>
2. Add nginx <code>proxy_pass</code> for <code>/api</code> routes to the address that backend listening 
(default is <code>localhost:5000</code>)
3. Configure a server with <code>config.json</code>
4. Init database with <code>setup</code> & <code>init</code> scripts from <code>dist/backend/server/db</code>
5. Now you can run server with **node**: <code>cd dist/backend/server && node -r tsconfig-paths/register index.js</code>
6. Or use **pm2**: <code>cd dist/backend/server && pm2 start index.js --node-args="-r tsconfig-paths/register"</code>