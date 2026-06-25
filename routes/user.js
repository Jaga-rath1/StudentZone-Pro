let express = require("express");
let router = express.Router({mergeParams:true});
let Student = require("../database/schema.js");
let {isloggedin} = require("../middleware.js");
//show all users
router.get("/",isloggedin,async(req,res)=>{
    let students = await Student.find();
    res.render("listings/index.ejs",{students});
});
//add a new user
//rendered a form
router.get("/new",isloggedin,(req,res)=>{
    res.render("listings/new.ejs");
});
//add the form data to the database
router.post("/",isloggedin,async(req,res)=>{
    let{name,age,course,totalfees,feespaid,remainingfees} = req.body;
    let newStudent = new Student({
        name : name,
        age : age,
        course : course,
        totalfees : totalfees,
        feespaid : feespaid,
        remainingfees : remainingfees
    });
    let s1 = await newStudent.save()
    console.log(s1);
    req.flash("success","New Student Added");
    res.redirect("/users");
});
//view details of a Student
router.get("/:id",isloggedin,async(req,res)=>{
    let {id} = req.params;
    let s1 = await Student.findById(id);
    if(!s1){
        req.flash("error","The Student Data Is Not Exist");
        return res.redirect("/users");
    };
    res.render("listings/show.ejs",{s1});
});
//edit The User details
//rendered the edit Form
router.get("/:id/edit",isloggedin,async(req,res)=>{
    let {id} = req.params;
    let s1 = await Student.findById(id);
    res.render("listings/edit.ejs",{s1});
});
//add the edited form to the database
router.patch("/:id",isloggedin,async(req,res)=>{
    let {id} = req.params;
    let {
        age : newAge,
        course : newCourse,
        totalfees : newTotalfees,
        feespaid : newfeespaid,
        remainingfees : newRemainingfees} = req.body;
    await Student.findByIdAndUpdate(
        id,{
            age : newAge,
            course : newCourse,
            totalfees : newTotalfees,
            feespaid : newfeespaid,
            remainingfees : newRemainingfees,
        },
    );
    req.flash("success","Student Data Edited");
    res.redirect(`/users/${id}`);
});
//delete the Student info
router.delete("/:id",isloggedin,async(req,res)=>{
    let {id} = req.params;
    await Student.findByIdAndDelete(id);
    req.flash("success","Student Data Deleted");
    res.redirect(`/users`);
});
module.exports = router;