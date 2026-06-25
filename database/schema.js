const mongoose = require("mongoose");
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
let studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    },
    course : {
        type : String,
        required : true,
    },
    totalfees : {
        type : Number,
        required :true,
    },
    feespaid : {
        type : Number,
        required : true
    },
    remainingfees : {
        type : Number,
        required : true,
    },

});
let Student = mongoose.model("Student",studentSchema);
module.exports = Student;