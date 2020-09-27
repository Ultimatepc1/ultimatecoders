const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Course = require('../models/Course')
const Video = require('../models/Video')
const Quiz = require('../models/Quiz')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created_at: today,
    userrole:req.body.userrole,
    phoneno:req.body.phoneno,
    dp:req.body.dp,
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              var result={"name": user.name,"email": user.email,"password": user.password,"phoneno": user.phoneno,"userrole": 'student'}
              res.json({ "result": result })
            })
            .catch(err => {
              res.json({"result": {"error" : err}})
            })
        })
      } else {
        res.json({"result":{ "error": 'User already exists' }})
      }
    })
    .catch(err => {
      res.json({"result":{ "error": err }})
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const tempuse = {"id": user.id,"name":user.name,"email":user.email,"userrole":user.userrole,"created_at":user.created_at,"phoneno":user.phoneno,"dp":user.dp}
          const token = jwt.sign(tempuse,'secret');
          res.json({"token":token})
        }else{
          res.json({"error": 'Invalid Username or Paswword'})
        }
      } else {
        res.status(400).json({ "error": 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(500).json({ "error": err })
    })
})

users.get('/courses',(req,res)=>{
  console.log("Users wala courses");
  Course.findAll({
    order: [
      ['studentcount', 'DESC'],
    ],}
  ).then(function(allcourses){
      var i;

      var result=[];
      for(i=0;i<allcourses.length;i++)
      {
        var tutor={"id":allcourses[i].tutorid, "name":allcourses[i].tutorname, "email":allcourses[i].tutoremail,"dp":allcourses[i].tutordp};

        var tempresult={"id":allcourses[i].courseid, "title":allcourses[i].title,
        "tutor":tutor, "duration":allcourses[i].duration,"poster":allcourses[i].poster}
        result.push(tempresult);

        console.log(allcourses[i]);
      }
      console.log(result);
      if (result.length > 0){
        res.json({'result': result});
      }else{
        res.json({'error': 'No Courses Found'})
      }
    })
    .catch(err=>{
      res.json({'error':err})
    });

});

users.get('/courses/:courseid',(req,res)=>{
  var localid=parseInt(req.params.courseid)
  var videodata=[]

      Video.findAll({
        where:{
          
          courseid:localid,
        }
      })
      .then(video=>{
        console.log("video"+video)
        var i;
        for(i=0;i<video.length;i++)
        {
          var videoresult={"id":video[i].videoid, "title":video[i].videotitle,
                            "duration":video[i].videoduration,"videourl":video[i].videourl}
         console.log("videoresult"+videoresult)
          videodata.push(videoresult)
          
          // videodata.push(videoresult);
        }
        console.log("videodata after for loop"+videodata)
        // res.send(video);

            var quizdata=[]
            Quiz.findAll({
              where:{
                courseid:localid,
              }
            })
            .then(quiz1=>{
              var j
              for(j=0;j<quiz1.length;j++)
              {
                var quizresult={"id":quiz1[j].quizid, "title":quiz1[j].quiztitle, "quizurl":quiz1[j].quizurl }
                quizdata.push(quizresult)
              }
            

                // Course
                Course.findOne({
                  where: {
                    courseid:localid
                  }
                })
                .then(course=>{
                  if(course){
              
                    // Pass course
                    // var result=[];
                    console.log("videodata in if of then of course"+videodata)
                    var tutor={"id":course.tutorid, "name":course.tutorname, "email":course.tutoremail,"dp":course.tutordp};    
                    var tempresult={"id":course.courseid, "title":course.title,
                    "tutor":tutor, "duration":course.duration,"poster":course.poster,
                    "description":course.coursedescription,
                      "video":videodata, "quiz":quizdata}
                    // result.push(tempresult);
                    console.log("tempresult"+tempresult)
                    res.json({'result': tempresult});
                    }
                    else
                    {
                      res.json({'error':"Course not found"})
                    }
                })
                .catch(err=>{
                  res.json({'error':err})
                });
            })
        .catch(err=>{
          console.log('error in quiz')
          res.json({'error in quiz':err})
        });
      })
      .catch(err=>{
        console.log("error in video")
        res.json({'error':err})
        
      });

      console.log("videodata at the end"+videodata);
      

});
// users.get('/courses/:courseid',(req,res)=>{
//   var localid=parseInt(req.params.courseid)
//   var videodata=[]

//       Video.findAll({
//         where:{
          
//           courseid:localid,
//         }
//       })
//       .then(video=>{

//         console.log("video"+video)
//         var i;
//         for(i=0;i<video.length;i++)
//         {
//           var videoresult={"id":video[i].videourl, "title":video[i].videotitle,
//                             "duration":video[i].videoduration,"videourl":video[i].videourl}
//          console.log("videoresult"+videoresult)
//           videodata.push(videoresult)
          
//           // videodata.push(videoresult);
//         }
//         console.log("videodata after for loop"+videodata)
//         // res.send(video);

// //--------------
//         Course.findOne({
//           where: {
//             courseid:req.params.courseid
//           }
//         })
//         .then(course=>{
//           if(course){
      
//             // Pass course
//             // var result=[];
//             console.log("videodata in if of then of course"+videodata)
//             var tutor={"id":course.tutorid, "name":course.tutorname, "email":course.tutoremail,"dp":course.tutordp};    
//             var tempresult={"id":course.courseid, "title":course.title,
//             "tutor":tutor, "duration":course.duration,"poster":course.poster,
//             "description":course.coursedescription,
//               "video":videodata}
//             // result.push(tempresult);
//             console.log("tempresult"+tempresult)
//             res.json({'result': tempresult});

//             }
//           else
//           {
//             res.json({'error':"Course not found"})
//           }
      
//         }
//         )
//         .catch(err=>{
//           res.json({'error':err})
//         });
// // ------------------
//       })
//       .catch(err=>{
//         console.log("error in video")
//         res.json({'error':err})  
//       });
//       console.log("videodata at the end"+videodata);
//   });



module.exports = users