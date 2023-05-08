let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../app");
const expect = require("chai").expect;

describe("Register | Login Tests", () => {
  it("signs in validates the token and Login : Success", (done) => {
    let singupBody = {
      fullName: "test name",
      email: "test1234@gmail.com",
      role: "admin",
      password: "test1234",
      preferences: "Batman",
      id: 51,
    };
    chai
      .request(server)
      .post("/auth/register")
      .send(singupBody)
      .end((err, res) => {
        let signInBody = {
          email: "test1234@gmail.com",
          password: "test1234",
        };
        chai
          .request(server)
          .post("/auth/login")
          .send(signInBody)
          .end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body.accessToken.length).greaterThanOrEqual(10);
            expect(res.body.user.id).equals(51);
            expect(res.body.user.email).equals("test1234@gmail.com");
            expect(res.body.user.fullName).equals("test name");
            done();
          });
      })
      .timeout(5000);
  });

  it("register and Login(invalid password): failure", (done) => {
    let singupBody = {
      fullName: "test name",
      email: "test12345@gmail.com",
      role: "admin",
      password: "test1234",
      preferences: "Batman",
      id: 501,
    };
    chai
      .request(server)
      .post("/auth/register")
      .send(singupBody)
      .end((err, res) => {
        let signInBody = {
          email: "test12345@gmail.com",
          password: "test124",
        };
        chai
          .request(server)
          .post("/auth/login")
          .send(signInBody)
          .end((err, res) => {
            expect(res.status).equal(401);
            expect(res.body.accessToken).equal(null);
            expect(res.body.message).equal("Invalid Credentials");
            done();
          });
      })
      .timeout(5000);
  });
});
