# Template for Node Js + Typescript


## Project setup


### Postgres Docker

This uses podman to startup the vitual environment used for the postgress database

1: Place all the database initialization files in `scripts` folder.

2: To start the database
```
podman-compose up -d
```

### Node setup

<table>
<tr>
<td> File </td> <td> contents </td>
</tr>
<tr>
<td> package.json </td>
<td>

```bash
npm init -y
npm i express dotenv helmet cors http-status-code uuid bcryptjs
npm i -D typescript
npm i -D @types/express @types/dotenv @types/helmet @types/cors @types/http-status-codes @types/uuid @types/bcryptjs
npm i -D ts-node-dev
#npm i ts-node
npm install sequelize sequelize-typescript pg
npm i -D chai mocha nodemon supertest
​​​​​​​npm i -D @types/node @types/mocha @types/chai @types/supertest 
npm i -D @istanbuljs/nyc-config-typescript
npm i -D  sinon @types/sinon
npm i -D @types/sinon-express-mock sinon-express-mock

npm install --save @types/sinon-chai
npm install --save sinon-chai
```
</td>
</tr>
<tr>
<td> tsconfig.json </td>
<td>

```json
{
    "compilerOptions": {
        "target": "es2017",
        "module": "ESNext",
        "outDir": "dist",
        "sourceMap": true
    },
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
        "node_modules",
        "test/**/*.ts"
    ]
}
```
</td>
</tr>
<tr>
<td>

package.json
<td>
<td>

```json
{

    "type":"module,
    "scripts": {
        "test-dev": "nodemon --watch . --ext ts --exec \"mocha -r ts-node/
    }
}
```
</td>
</tr>
</table>
