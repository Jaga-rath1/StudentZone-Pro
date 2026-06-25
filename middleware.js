module.exports.isloggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You Must Be Loggedin To View Something In The App");
        return res.redirect("/login");
    };
    next();
};