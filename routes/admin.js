let express = require("express");
let router = express.Router();
let passport = require("passport");
let Admin = require("../model/admin.js");
let {isloggedin} = require("../middleware.js");
router.get("/signup",(req,res)=>{
    res.render("admins/signup.ejs");
});
router.post("/signup",async(req,res,next)=>{
    try{
    let{username,email,password} = req.body;
    let newAdmin = new Admin({username,email});
    let registerUser = await Admin.register(newAdmin,password);
    console.log(registerUser);
    req.logIn(registerUser,(err)=>{
        if(err){
            next(err);
        };
        req.flash("success","Welcome To StudentZone");
        res.redirect("/users");
    });
    }catch(e){
        req.flash("error",e.message);
        return res.redirect("/signup");
    };
    
});
router.get("/login",(req,res)=>{
    res.render("admins/login.ejs");
});
router.post("/login",passport.authenticate(
    "local",{
        failureRedirect : "/login",
        failureFlash : true,
    },
) ,async(req,res)=>{
    req.flash("success","Welcome Back");
    res.redirect("/dashboard");
});
router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        };
        req.flash("success","You Logged Out SuccessFully ");
        res.redirect("/login");
    });
});
router.get("/dashboard",isloggedin,(req,res)=>{
    res.render("listings/dashboard.ejs");
})
module.exports = router;