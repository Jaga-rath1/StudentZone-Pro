const { text } = require("express");
let mongoose = require("mongoose");
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/StudentzonePro");
};
main()
.then(()=>{
    console.log("Connection SuccessFull");
})
.catch((err)=>{
    console.log(err);
});
let courseSchema = new mongoose.Schema({
    course1 : {
        type : String,
        required : true,
    },
});
let Courses = mongoose.model("Courses",courseSchema);
module.exports = Courses;