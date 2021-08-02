const Sequelize = require('sequelize')
const sequelize = require('../database/databaseConnection')


const users = sequelize.define('Users', {
  id: { primaryKey: true, type: Sequelize.INTEGER },
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  gender: Sequelize.STRING,
  last_name: Sequelize.STRING,
  ip_address: Sequelize.STRING
},
{
  timestamps: false
})


module.exports = users