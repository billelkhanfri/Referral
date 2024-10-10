const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const Joi = require("joi");
//user schema

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        publicId: null,
      },
    },
    organisation: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
    },

    secteurs: {
      type: String,
      trim: true,
      required: true,
    },
    cpi: {
      type: String,
      unique: true,
      trim: true,
      //TODO ADD REAL CPI VALIDATION USING REGEX
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    competence :{
      type : String,
      enum : ['competence1', 'competence2', 'competence3', 'competence4']
    }
  },

  { timestamps: true }
);

//Generate Auth Token
UserSchema.methods.generateAuthToken =  function (){
  return jwt.sign({id : this._id, isAdmin : this.isAdmin}, process.env.JWT_SECRET);
}
// User Model

const User = mongoose.model("User", UserSchema);

// Validate Register User

function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(5).required(),
    organisation: Joi.string().trim().min(2).required(),
    phone: Joi.string().trim().min(6).required(),
    secteurs: Joi.string().trim().min(2).required(),
    cpi: Joi.string().trim().min(5).required(),
    termsAccepted: Joi.boolean().required(),
    competence: Joi.string().trim().min(2).max(100).required(),
  });
  return schema.validate(obj);
}

//  Validate Login user
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(5).required(),
  });
  return schema.validate(obj);
}
module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
};
