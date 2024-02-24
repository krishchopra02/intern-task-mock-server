const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_URI || 'localhost:3306',
    dialect: 'mysql',
  }
)
const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to db has been established successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
module.exports = { sequelize, connectDB }
