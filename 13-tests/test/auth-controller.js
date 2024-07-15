const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");
const { name } = require("body-parser");

describe("Auth Controller - Signup", function () {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://krystian:krystian@cluster0-ntrwp.mongodb.net/test-messages?retryWrites=true"
      ) // test-messages
      .then((result) => {
        const User = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          posts: [],
          _id: "id123",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  beforeEach(function () {
    // before each test
  });

  afterEach(function () {
    // before each test
  });

  it("should throw an error with code 500 if accessing the database fails", function (done) {
    sinon.stub(User, "findOne"); // atrapa funkcji, która może być używana do symulowania zachowań w testach
    User.findOne.throws(); // symulacja rzucenia błędu za każdym razem, gdy metoda findOne zostanie wywołana

    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };

    AuthController.login(req, {}, () => {}).then((result) => {
      // żądanie, pusty obiekt odpowiedzi (res) i pustą funkcję callback.
      // console.log(result);
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done(); // test został zakończony po wykonaniu wszystkich asynchronicznych operacji i może przejść do kolejnego testu.
    });

    User.findOne.restore(); // przywrócenie oryginalnej funkcji
  });

  it("should send a response with a valid user status for an existing user", function (done) {
    const req = { userId: "id123" }; // getUserStatus
    const res = {
      statusCode: 500,
      user: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.user = data;
      },
    };
    AuthController.getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.user).to.be.equal("I am new!");
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
