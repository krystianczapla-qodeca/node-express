const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
// const AuthController = require("../controllers/auth");
const FeedController = require("../controllers/feed");
const { name } = require("body-parser");

describe("Feed Controller", function () {
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

  it("should add a created post to the posts of the creator", function (done) {
    const req = {
      body: {
        title: 'Test Post',
        content: 'A Test Post'
      },
      file: {
        path: 'abc'
      },
      userId: 'id123' // bo user ID ma znaczenie 
    };
    const res = { status: function() {
        return this;
    }, json: function() {} };

    FeedController.createPost(req, res, () => {}).then(savedUser => {
        expect(savedUser).to.have.property('posts');
        expect(savedUser.posts).to.have.length(1);
        done();
    });

    User.findOne.restore(); // przywrócenie oryginalnej funkcji
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

