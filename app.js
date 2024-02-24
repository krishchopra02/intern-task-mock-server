const express = require('express')
const { connectDB } = require('./db/connect')
const leaderboardRoutes = require('./routes/leaderboard')
const userRoutes = require('./routes/user')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error')
require('dotenv').config()
const PORT = process.env.port || 5000
const app = express()

// middleware
app.use(express.json())

//routes
app.use('/leaderboard', leaderboardRoutes)
app.use('/user', userRoutes)

app.get('/', (res, req) => {
  res.status(200).send('<h1> Welcome </h1>')
})
app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log('Listening at port: ', PORT)
    })
  } catch (error) {
    console.error(error)
  }
}
start()
