const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateRegisterUser } = require("../models/User");

/** --------------------------------------
 * @description Register New User
 * @router /api/auth/register
 * @method POST
 * @access public
  -------------------------------------- */

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ message: "l'utilisateur existe déja" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    organisation: req.body.organisation,
    phone: req.body.phone,
    secteurs: req.body.secteurs,
    cpi: req.body.cpi,
    termsAccepted: req.body.termsAccepted,
  });

  await user.save;
  res.status(201).json({ message: "Utilisateur créé avec succès" });
});
