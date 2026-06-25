let express = require("express");
let app = express();
let port = 3000;
let path = require("path");
let ejsMate = require("ejs-mate");
//for Student Schema
let Student = require("./database/schema.js");
//for Course Schema
let Courses = require("./database/course.js");
//for ejs-mate
app.engine('ejs', ejsMate);
//for method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//for static file
app.use(express.static(path.join(__dirname, "public")));
//for post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for passport
let passport = require("passport");
let Localstrategy = require("passport-local");
//for express-session
let session = require("express-session");
app.use(session({
    secret : "mysecretKey",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,

    },
}));
//require usermodel for passport
let Admin = require("./model/admin.js");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
//create a demo user
// app.get("/demouser",async(req,res)=>{
//     let newAdmin = new Admin({
//         username : "jk",
//         email : "rathjaga83@gmail.com",
//     });
//     let registeredAdmin = await Admin.register(newAdmin,"hello12");
//     res.send(registeredAdmin);
// });
// for connect-flash
let flash = require("connect-flash");
app.use(flash());
//res.locals middleware
app.use((req,res,next)=>{
    res.locals.successmsg = req.flash("success");
    res.locals.errormsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
//for ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.listen(port,()=>{
    console.log("Bhai Sunuchi Re..");
});
//require user route
let userrouter = require("./routes/user.js");
app.use("/users",userrouter);
//require Admin router admin.js
let adminrouter = require("./routes/admin.js");
app.use("/",adminrouter);
//require Course Router
let courserouter = require("./routes/courses.js");
app.use("/courses",courserouter);