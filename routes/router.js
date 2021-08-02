const { Router } = require('express')
const { Op } = require('sequelize')

const users = require('../models/User')
const users_statistic = require('../models/User_Statistics')


const router = Router()

router.get('/', async (req, res) => {
  try {
    const paginatedUsers = await getPaginatedUsers()
    res.status(200).json(paginatedUsers)
  } catch (err) {
    res.status(500).json({message: 'Server error'})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const infoAboutUser = await getUsersStatsByDate(33, '2019-10-02', '2019-10-20')
    res.json(infoAboutUser)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

// UTILS
async function getPaginatedUsers(pageIndex = 1, rowsCount = 50) {
  const offset = --pageIndex * rowsCount
  const limit = rowsCount

  const paginatedUsers = await users.findAll({offset: offset, limit: limit, raw: true})
  const usersWithStats = await Promise.all(paginatedUsers.map(getStatsForUserTable))
  return usersWithStats
}

async function getStatsForUserTable(user) {
  const usersInfo = await users_statistic.findAll({where: {user_id: user.id}, raw: true})
  const totalClicks = usersInfo.reduce((acc, date) => acc + date.clicks, 0)
  const totalViews = usersInfo.reduce((acc, date) => acc + date.page_views, 0)
  
  return {
    ...user,
    total_clicks: totalClicks,
    total_views: totalViews
  }
}

async function getUsersStatsByDate(id, startDate, endDate) {
  try {
    const usersInfo = await users_statistic.findAll({
      where: {
        [Op.and]: [
          { user_id: id },
          { date: {
            [Op.between]: [startDate, endDate]
          }}
        ]
      }
    })
    return usersInfo
  } catch (err) {
    console.log(err)
  }
}