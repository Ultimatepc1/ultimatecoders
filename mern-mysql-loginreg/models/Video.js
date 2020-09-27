const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'video',
  {
    videoid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    videotitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    videoduration: {
      type: Sequelize.STRING,
      allowNull:false,
    },
    videourl:{
      type: Sequelize.STRING,
      defaultValue:'https://www.youtube.com/watch?v=VavWEtI5T7c',
    },
    courseid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  },
  {
    timestamps: false
  }
)