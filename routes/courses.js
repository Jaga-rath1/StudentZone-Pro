let express = require("express");
let router = express.Router({mergeParams : true});
let Courses = require("../database/course.js");
let Student = require("../database/schema.js");
let {isloggedin} = require("../middleware.js");
//to show all courses
router.get("/",async(req,res)=>{
    let courses = await Courses.find();
    res.render("courses/courseshow.ejs",{courses});
});
//add a new Course
//rendered a new course
router.get("/new",isloggedin,(req,res)=>{
    res.render("courses/coursenew.ejs");
});
router.post("/",isloggedin,async(req,res)=>{
    let {course1 : newCourse1} = req.body;
    let newCourse = new Courses({
        course1 : newCourse1,
    });
    let c1 = await newCourse.save();
    req.flash("success","New Course Added");
    res.redirect("/courses");
});
//view All Students
router.get("/:id",isloggedin,async(req,res)=>{
    let {id} = req.params;
    let c1 = await Courses.findById(id);
    let Students = await Student.find({
        course : c1.course1,
    });
    if(Students.length==0){
        req.flash("error","No Students Exist For This Course");
        return res.redirect("/courses");
    };
    res.render("courses/showstudents.ejs",{c1,Students});
});
//destroy route
router.delete("/:id",isloggedin,async(req,res)=>{
    let {id} = req.params;
    let delcourse = await Courses.findByIdAndDelete(id);
    req.flash("success","Course Deleted SuccessFully");
    res.redirect("/courses");
});
module.exports = router;