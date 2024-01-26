import {expect} from 'chai';
import request from 'supertest';
import app from '../src/app';
import { faker } from '@faker-js/faker';
import { User } from '../src/models/User.model';


describe("App Test", () => {

    const password = 'password123';
    const email = faker.internet.email();
    const username = 'test';
    
    it('should POST /register', async function () {
        let user = {
                "username" : password,
                "email" : email,
                "password" : username
            }
    
        const res = await request(app).post('/register').send(user);;
        console.log(res.body.newUser)
        expect(res.status).to.equal(201);
        //expect(res.body).not.to.be.empty;
        //expect(res.body.newUser.id).not.to.be.empty;
        //expect(res.body.newUser.email).to.be.eq(email);
        User.destroy({where: {email: email}})
    });

});