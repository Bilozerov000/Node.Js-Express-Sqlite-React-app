const express = require('express')
const sequelize = require('./database/databaseConnection')

const routes = require('./routes/router')



const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/api/users', routes)

start()



// UTILS
async function start() {
  try {
    await sequelize.sync()

    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}...`)
    })
  } catch (err) {
    console.log(err)
  }
}

