var expect = require("chai").expect;
var index = require("../index");
var assert = require("assert");
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3001");
var request = require("request");

describe("signup", function() {
  it("signup", function(done) {
    server
      .post("/signup")
      .send({
        userName: "billgates@gmail.com",
        firstName: "bill",
        lastName: "gates"
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

describe("addnewtweet", function() {
  it("addnewtweet", function(done) {
    server
      .post("/addnewtweet")
      .send({
        userName: "billgates@gmail.com",
        tweetMsg: "first Tweet"
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

describe("getusers", function() {
  it("getusers", function(done) {
    server
      .post("/getusers")
      .send({
        userName: "nidhi07arvind"
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

describe("subscribetolist", function() {
  it("subscribetolist", function(done) {
    server
      .post("/subscribetolist")
      .send({
        listId: "5de01f90c837aa1730a27b87",
        userName: "nithin_k",
        firstName: "nithin",
        lastName: "krishna",
        query: "subscribers"
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

describe("addcommentontweet", function() {
  it("addcommentontweet", function(done) {
    server
      .post("/addcommentontweet")
      .send({
        tweetId: "5ddcf120c2138033b477e81e",
        userName: "CIGMijcjdip",
        firstName: "Nidhi",
        lastName: "Tattur",
        comment: "best match ever hello India",
        commentMedia: "abc.jpg"
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

/*var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code", function(done) {
  chai
    .request("http://127.0.0.1:3001")
    .post("/login")
    .send({ Email: "abc@gmail.com", Password: "abc", Profile: "Buyer" })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});*/
