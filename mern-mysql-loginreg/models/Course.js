const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'course',
    {
        courseid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          duration:{
              type:Sequelize.STRING,
              allowNull:false,
          },
          poster:{
            type:Sequelize.STRING,
            allowNull:false,
          },
          tutorid:{
            type:Sequelize.INTEGER,
            allowNull:false,
          },
          tutoremail:{
            type:Sequelize.STRING,
            allowNull:false,
          },
          created_at:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          studentcount:{
            type:Sequelize.INTEGER,
            allowNull:false,
            default:0,
          },
          coursedescription:{
            type:Sequelize.STRING,
            allowNull:true,
          },
          tutorname:{
            type: Sequelize.STRING,
            allowNull: false,
          },
          tutordp:{
            type: Sequelize.STRING,
            defaultValue:'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg',
          },
    },
    {
      timestamps: false
    });