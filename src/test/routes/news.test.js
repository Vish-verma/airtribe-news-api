let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../app");
const expect = require("chai").expect;

describe("fetches user News ", () => {
  it("NEWS: signs in validates the token and fetches the News: Success", (done) => {
    let singupBody = {
      fullName: "test name",
      email: "test12345@gmail.com",
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
          email: "test12345@gmail.com",
          password: "test1234",
        };
        chai
          .request(server)
          .post("/auth/login")
          .send(signInBody)
          .end((err, siginResponse) => {
            chai
              .request(server)
              .get("/news")
              .set("authorization", `JWT ${siginResponse.body.accessToken}`)
              .end((err, res) => {
                expect(res.status).equal(200);
                expect(res.body.articles.length).equals(20);
                done();
              });
          })
          .timeout(5000);
      });
  });

  it("NEWS: signs in, validates the token and and does not pass the authoriation header", (done) => {
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
          password: "test1234",
        };
        chai
          .request(server)
          .post("/auth/login")
          .send(signInBody)
          .end((err, siginResponse) => {
            chai
              .request(server)
              .get("/news")
              .end((err, res) => {
                expect(res.status).equal(403);
                expect(res.body.message).equal(
                  "Authorization header not found"
                );
                done();
              });
          })
          .timeout(5000);
      });
  });

  it("NEWS: signs in, validates the token and and does not pass the valid access header", (done) => {
    let singupBody = {
      fullName: "test name",
      email: "test12345@gmail.com",
      role: "admin",
      password: "test1234",
      preferences: "Batman",
      id: 504,
    };
    chai
      .request(server)
      .post("/auth/register")
      .send(singupBody)
      .end((err, res) => {
        let signInBody = {
          email: "test12345@gmail.com",
          password: "test1234",
        };
        chai
          .request(server)
          .post("/auth/login")
          .send(signInBody)
          .end((err, siginResponse) => {
            chai
              .request(server)
              .get("/news")
              .set("authorization", `JWT ${siginResponse.body.accessToken}abcd`)
              .end((err, res) => {
                expect(res.status).equal(403);
                expect(res.body.message).equal("Invalid JWT token");
                done();
              });
          })
          .timeout(5000);
      });
  });
});
