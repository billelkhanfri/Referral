const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

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
    competence: req.body.competence,
  });

  //To sending email (verify account)
  await user.save();
  res.status(201).json({ message: "Utilisateur créé avec succès" });
});

/** --------------------------------------
 * @description Login user
 * @router /api/auth/login
 * @method POST
 * @access public
  -------------------------------------- */

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // is user existing
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "Email ou mot de passe invalides." });
  }
  // compare password

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ error: "Email ou mot de passe invalides." });
  }

  //To sending email (verify account if not verified)
  // generate token
  const token = user.generateAuthToken();

  res.status(200).json({
    _id: user.id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    message: "Connexion réussie.",
  });

  // response to client
});
