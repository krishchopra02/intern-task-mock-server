const { Users } = require('../models/users')
const { Op } = require('sequelize')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const displayLeaderBoard = asyncWrapper(async (req, res) => {
  let { limit } = req.query
  if (!limit) {
    limit = 200
  }
  const users = await Users.findAll({
    order: [
      ['Score', 'DESC'],
      ['Name', 'ASC'],
    ],
    attributes: ['UID', 'Name', 'Score', 'Country', 'Timestamp'],
    limit: Number(limit),
  })
  res.status(200).json({ users })
})

const displayLeaderBoardByCountry = asyncWrapper(async (req, res, next) => {
  const { country } = req.params
  const { limit } = req.query
  if (!limit) {
    limit = 200
  }
  const users = await Users.findAll({
    where: {
      Country: country,
      Timestamp: {
        [Op.lte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    order: [
      ['Score', 'DESC'],
      ['Name', 'ASC'],
    ],
    attributes: ['UID', 'Name', 'Score', 'Country', 'Timestamp'],
    limit: Number(limit),
  })
  if (!users || users.length === 0) {
    return next(
      createCustomError(`No country with country code: ${country}`, 404)
    )
  }
  res.status(200).json({ users })
})

module.exports = { displayLeaderBoard, displayLeaderBoardByCountry }
