let express = require("express");
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose").default;
let adminSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
});
adminSchema.plugin(passportLocalMongoose);
let Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;