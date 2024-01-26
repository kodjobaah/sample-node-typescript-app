import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { Model, Repository} from 'sequelize-typescript';

import {User}  from "../src/models/User";
import UserController from "../src/user/user.controller";

import proxyquire from 'proxyquire'

import { makeMockModels } from 'sequelize-test-helpers'


import httpMocks from 'node-mocks-http'

chai.use(sinonChai);

describe("UserController", () => {

    afterEach(() => {
        sinon.restore();
      });

    it("should return all users in the database", () => {
        
        
        const promise: Promise<Model<any, any>[]> = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([]);
            }, 300);
          });
        let findAll = sinon.spy(User,"findAll");
    

        const request = httpMocks.createRequest({
            params: {
                id: 42
            }
        });
        
        const response = httpMocks.createResponse();
        response.on('send', function () {
            expect(response._getData()).to.equal('data sent in request');
            done();
        });



        const req = {} as Request;
        const res = {} as Response;


        UserController.findAll(request, res)
        expect(res.send).to.have.been.calledWith("mockUsers");
        const data = response._getData(); 
        console.log("response:"+data)
        // expect(res.json).to.be.calledWith({ msg: `No Users at this time.` })
        // expect(res.status).to.be.calledWith(StatusCodes.NOT_FOUND)
        // res.status(StatusCodes.NOT_FOUND).json({ msg: `No Users at this time.` })
        // expect(true).to.equal(true)
    })   
})

function done() {
    throw new Error("Function not implemented.")
}
