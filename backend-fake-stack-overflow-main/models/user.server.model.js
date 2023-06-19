// Path: app\models\user.server.model.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    // validate: [validator.isEmail, 'Invalid Email']
  },
  profile_image: {
    type: String,
    default:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  // role admin, user
  roles: {
    type: String,
    trim: true,
    default: "user",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    default: "active",
  },
  reputation: {
    type: Number,
    default: 0,
  },

  saved_questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Questions",
    },
  ],
  groups: {
    type: [Schema.Types.ObjectId],
    ref: "Groups",
    default: [],
  },

  password_reset_token: String,
  password_reset_expires: Date,
  password_changed_at: Date,

  created_date: {
    type: Date,
    default: Date.now(),
  },
  updated_date: {
    type: Date,
    default: Date.now(),
  },
});

// authenticate input against database documents
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username }).exec(function (err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

UserSchema.pre("save", function (next) {
  this.updated_date = Date.now();
  next();
});

// comparePassword
UserSchema.methods.comparePassword = async function (
  input_password,
  user_password
) {
  return await bcrypt.compare(input_password, user_password);
};

// hash password before saving to database
UserSchema.pre("save", async function (next) {
  // Only run if password is modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// generateAuthToken to gen jwt
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_PRIVATE);
  return token;
};

// GENERATE RANDOM TOKEN
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.password_reset_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.password_reset_expires = Date.now() + 10 * 60 * 1000; // expires after 10m

  return resetToken;
};

// UPDATE PASSWORD_CHANGED_AT
UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.password_changed_at = Date.now() - 1000;

  next();
});

// CHECK PASSWORD IS CHANGED AFTER THE TOKEN IS ISSUED
UserSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.password_changed_at) {
    const changedTimestamp = parseInt(this.password_changed_at / 1000, 10);
    return changedTimestamp > JWTTimestamp;
  }

  return false; // Not changed
};

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
