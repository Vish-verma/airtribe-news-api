const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');

const validator = require("../../helper/validator");
const {users: userData} = require("../../data/users.json");
const { describe, it, beforeEach } = require('mocha');

let user =  {
    "fullName": "Bruce",
    "email": "Bruce@gotham.com",
    "id": 2,
    "password": "Bruce",
    "preferences": "Batman"
  }


describe("Validator function validateUserInfo-> Testing the Validator", function () {
    let tempUser;
    beforeEach((done)=>{
        tempUser={...user}
        done();
    })
    it("Validating User Info : Success", function (done){
        let response = validator.validateUserInfo(tempUser,userData);
        expect(response.status).equal(true);
        expect(response.message).equal("User has been Added");
        done();
    });
    it("Validating User Info (UniqueID): Failure", function (done){
        tempUser.id= 1;
        let response = validator.validateUserInfo(tempUser,userData);
        expect(response.status).equal(false);
        expect(response.message).equal("Id should be Unique");
        done();
    })
    it("Validating User Info (UniqueEmail): Failure", function (done){
        tempUser.email= "Clark@gotham.com";
        let response = validator.validateUserInfo(tempUser,userData);
        expect(response.status).equal(false);
        expect(response.message).equal("Email should be Unique");
        done();
    })
    it("Validating User Info (Missing Property): Failure", function (done){
        delete tempUser.email;
        let response = validator.validateUserInfo(tempUser,userData);
        expect(response.status).equal(false);
        expect(response.message).equal("User Info is malformed please provide all the properties");
        done();
    })

})

describe("Validator function validateUserObj-> Testing the Validator", function () {
    let tempUser;
    beforeEach((done)=>{
        tempUser={...user}
        done();
    })
    it("Validating User Obj : Success", function (done){
        let response = validator.validateUserObj(tempUser);
        expect(response.status).equal(true);
        expect(response.message).equal("User has been updated");
        done();
    });
    it("Validating User Obj (Missing Property): Failure", function (done){
        delete tempUser.id;
        let response = validator.validateUserObj(tempUser);
        expect(response.status).equal(false);
        expect(response.message).equal("User Info is malformed please provide all the properties");
        done();
    });
    it("Validating User Obj (Missing Property): Failure", function (done){
        delete tempUser.email;
        let response = validator.validateUserObj(tempUser);
        expect(response.status).equal(false);
        expect(response.message).equal("User Info is malformed please provide all the properties");
        done();
    });
    it("Validating User Obj (Missing Property): Failure", function (done){
        delete tempUser.fullName;
        let response = validator.validateUserObj(tempUser);
        expect(response.status).equal(false);
        expect(response.message).equal("User Info is malformed please provide all the properties");
        done();
    });
    it("Validating User Obj (Missing Property): Failure", function (done){
        delete tempUser.password;
        let response = validator.validateUserObj(tempUser);
        expect(response.status).equal(false);
        expect(response.message).equal("User Info is malformed please provide all the properties");
        done();
    });
    it("Validating User Obj (Missing Property): Failure", function (done){
        delete tempUser.preferences;
        let response = validator.validateUserObj(tempUser);
        expect(response.status).equal(false);
        expect(response.message).equal("User Info is malformed please provide all the properties");
        done();
    });

})

describe("Validator function validateUniqueEmail-> Testing the Validator", function () {
    let tempUser;
    beforeEach((done)=>{
        tempUser={...user}
        done();
    })
    it("Validating unique mail : Success", function (done){
        let response = validator.validateUniqueEmail(tempUser,userData);
        expect(response).equal(false);
        done();
    });
    it("Validating unique email: Failure", function (done){
        tempUser.email= "Clark@gotham.com";
        let response = validator.validateUniqueEmail(tempUser,userData);
        expect(response).equal(true);
        done();
    });

})
describe("Validator function validateUniqueId-> Testing the Validator", function () {
    let tempUser;
    beforeEach((done)=>{
        tempUser={...user}
        done();
    })
    it("Validating unique mail : Success", function (done){
        let response = validator.validateUniqueId(tempUser,userData);
        expect(response).equal(false);
        done();
    });
    it("Validating unique email: Failure", function (done){
        tempUser.id= 1;
        let response = validator.validateUniqueId(tempUser,userData);
        expect(response).equal(true);
        done();
    });

})