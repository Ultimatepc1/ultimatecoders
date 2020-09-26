const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
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
              res.json({ status: user.email + 'Registered!' })
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
          const tempuse = {"id": user.id,"name":user.name,"email":user.email,"userrole":user.userrole,"created_at":user.created_at,"phoneno":user.phoneno}
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
      res.status(400).json({ "error": err })
    })
})

// users.get('/profile', (req, res) => {
//   var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

//   User.findOne({
//     where: {
//       id: decoded.id
//     }
//   })
//     .then(user => {
//       if (user) {
//         res.json(user)
//       } else {
//         res.send('User does not exist')
//       }
//     })
//     .catch(err => {
//       res.send('error: ' + err)
//     })
// })

module.exports = users