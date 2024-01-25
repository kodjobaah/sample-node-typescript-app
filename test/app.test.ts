import {expect} from 'chai';
import request from 'supertest';
import app from '../src/app';
import {User} from '../src/user/user.interface';

const password = 'password123';
const email = 'test@email.com';
const username = 'test';

describe("App Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });

    it('should POST /register', async function () {
        let user = {
                "username" : password,
                "email" : email,
                "password" : username
            }
    
        const res = await request(app).post('/register').send(user);;
        console.log(res.body.newUser)
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body.newUser.id).not.to.be.empty;
        expect(res.body.newUser.email).to.be.eq(email);
    });

});