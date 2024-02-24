const { sequelize } = require('../db/connect')
const { DataTypes } = require('sequelize')
const Users = sequelize.define(
  'User',
  {
    UID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
    },
    Score: {
      type: DataTypes.INTEGER,
      validate: {
        wrongScoreValue(value) {
          if (value < 0 || value > 100) {
            throw new Error('Wrong Score Value')
          }
        },
      },
      Country: {
        type: DataTypes.STRING,
        validate: {
          wrongCountryCode(value) {
            if (value.length !== 2) {
              throw new Error('Wrong Country Code')
            }
          },
        },
        Timestamp: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
    },
  },
  {
    timestamps: false,
  }
)

module.exports = { Users }
