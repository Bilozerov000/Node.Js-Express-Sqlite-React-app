const path = require('path')
const Sequelize = require('sequelize')

// const users = require('../models/User')
// const users_statistic = require('../models/User_Statistics')

// const USERS_DATA = require('../storage/users.json')
// const USERS_STATISTIC_DATA = require('../storage/users_statistic.json')

const dbPath = path.join(__dirname, 'database.sqlite')



const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath
})

connect()
// insertRows()
// close()



module.exports = sequelize

// UTILS
async function connect() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.log(error)
  }
}

async function insertRows() {
  await users.sync()
  USERS_DATA.forEach( async user => {
    try {
      await users.create({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        ip_address: user.ip_address
      })
    } catch (err) {
      console.log(err)
    }
  })

  await users_statistic.sync()
  USERS_STATISTIC_DATA.forEach( async userStats => {
    try {
      await users_statistic.create({
        user_id: userStats.user_id,
        date: userStats.date,
        page_views: userStats.page_views,
        clicks: userStats.clicks
      })
    } catch (err) {
      console.log(err)
    }
  })
}

async function close() {
  try {
    await sequelize.close()
    console.log('Connection has been closed successfully.')
  } catch (error) {
    console.log(error)
  }
}