const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'quizzes',
  {
    quizid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quiztitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quizurl: {
      type: Sequelize.STRING,
      defaultValue:'',
      allowNull:false,
    },
    courseid:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
  },
  {
    timestamps: false
  }
)