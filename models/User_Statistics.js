const Sequelize = require('sequelize')
const sequelize = require('../database/databaseConnection')


const users_statistic = sequelize.define('Users_Statistic', {
  user_id: Sequelize.INTEGER,
  date: Sequelize.STRING,
  page_views: Sequelize.INTEGER,
  clicks: Sequelize.INTEGER
},
{
  timestamps: false
})
users_statistic.removeAttribute('id')


module.exports = users_statistic