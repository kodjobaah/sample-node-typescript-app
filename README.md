npm init -y
npm i express dotenv helmet cors http-status-code uuid bcryptjs
npm i -D typescript
npm i -D @types/express @types/dotenv @types/helmet @types/cors @types/http-status-codes @types/uuid @types/bcryptjs
npm i -D ts-node-dev
#npm i ts-node

npm i -D chai mocha nodemon supertest
​​​​​​​npm i -D @types/node @types/mocha @types/chai @types/supertest 
npm i -D @istanbuljs/nyc-config-typescript
npm i -D  sinon @types/sinon
npm i -D @types/sinon-express-mock sinon-express-mock

npm install --save @types/sinon-chai
npm install --save sinon-chai


tsconfig.json:
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

package.json
{
    "type":"module,
}
"test-dev": "nodemon --watch . --ext ts --exec \"mocha -r ts-node/register test/**/*.test.ts\""
