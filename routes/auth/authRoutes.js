var passport = require("passport");
const router = require("express").Router();
const authController = require("../../controller/user-controller");

//First the button is hit to update passport
router.route("/login").get( (req, res) => {
  passport = req.app.get('passport')
  res.redirect("/auth/google")
})

//Then the user redirects to youtube
router.route("/").get((req,res,next)=>{
  passport.authenticate('google', { scope: ["profile", "email"] })(req,res,next)
})

//Once the user is verified, return to site
router.route("/callback").get((req,res,next)=>{
  passport.authenticate('google', { successRedirect: '/auth/google/profile', failureRedirect: '/', failureFlash: 'Invalid login' })(req, res, next)
})

//Redirect the user to their profile page
router.route("/profile").get(isLoggedIn, authController.profile);

//If the user hits log out btn, run logout
router.route("/logout").get(authController.logout);

//Check if the user is already logged in or not
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to home or signins
  res.redirect('/');
}

module.exports = router;
