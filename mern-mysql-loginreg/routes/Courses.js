const express = require('express')
const courses = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Course = require('../models/Course')

courses.use(cors())

courses.get('/courses',(req,res)=>{

    console.log("Hi hellp");
    Course.findAndCountAll().then(function(allcourses){

        // var result={};
        var i;
        
        console.log(allcourses.length);
        for (i = 0; i < allcourses.length; i++) {
        //     // User.findOne({
            //     where: {
            //         email: allcourses[i].email
            //       }
            // })
            // var currentResult=allcourses

            // .then(accounts => accounts.map(account => account.Name));

            console.log(allcourses[i]);

            // allcourses.map(allcourse=>allcourse.title);
        }
    });

});

module.exports = courses