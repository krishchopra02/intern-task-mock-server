const { Sequelize } = require('sequelize')
const { Users } = require('../models/users')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const getUser = asyncWrapper(async (req, res, next) => {
  const { userId } = req.params
  const users = await Users.findAll({
    attributes: [
      'UID',
      'Name',
      'Score',
      'Country',
      'Timestamp',
      [Sequelize.literal('(RANK() OVER (ORDER BY Score DESC))'), 'rank'],
    ],
  })

  const user = users.find((user) => {
    return user.dataValues.UID === userId
  })
  if (!user) {
    return next(createCustomError(`No user with UID: ${userId}`, 404))
  }
  res.status(200).json({ user })
})
module.exports = { getUser }
