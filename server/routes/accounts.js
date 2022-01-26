const express = require("express"),
  bodyParser = require("body-parser"),
  accountsRouter = express.Router(),
  user = require("../model/user"),
  userSession = require("../model/userSession");
accountsRouter.use(bodyParser.json());

accountsRouter.route("/signup").post((req, res) => {
  const { body } = req;
  let { name, email, password, interests } = body;
  console.log(`req.body`, req.body);
  if (!name) {
    return res.send({
      success: false,
      message: "Error: Name cannot be empty",
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be empty",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be empty",
    });
  }
  if (!interests || interests.length <= 0) {
    return res.send({
      success: false,
      message: "Error: Select your Interests",
    });
  }

  email = email.toLowerCase();

  /*Steps
    verify email
    save*/

  user.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error",
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exist.",
        });
      }

      const newUser = new user();

      newUser.email = email;
      newUser.name = name;
      newUser.password = newUser.generateHash(password);
      newUser.interests = interests
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error",
          });
        }
        return res.send({
          success: true,
          message: "Signed Up.",
        });
      });
    }
  );
});

accountsRouter.route("/signin").post((req, res) => {
  const { body } = req;
  let { email, password } = body;
  console.log(`req.body`, req.body);

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be empty",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be empty",
    });
  }
  email = email.toLowerCase();
  user.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error server error",
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "User doesnot exist",
        });
      }

      const User = users[0];
      if (!User.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid password",
        });
      }
      console.log("User", User)
      const newUserSession = new userSession();
      newUserSession.userId = User._id;
      newUserSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Invalid",
          });
        }
        return res.send({
          success: true,
          message: "Valid signIn",
          token: User._id,
        });
      });
    }
  );
});

accountsRouter.route("/signout").get((req, res) => {
  const { query } = req;
  const { token } = query;
  //?token=test

  //verify the token is one of  a kindand its not deleted
  userSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    { $set: { isDeleted: true } },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }

      return res.send({
        success: true,
        message: "Good",
      });
    }
  );
});

module.exports = accountsRouter;
