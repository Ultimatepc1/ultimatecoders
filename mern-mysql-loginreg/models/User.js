const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique:true,
      allowNull:false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    userrole:{
        type: Sequelize.STRING,
        defaultValue:'student',
    },
    phoneno:{
        type:Sequelize.STRING,
        allowNull:true,
    }
  },
  {
    timestamps: false
  }
)