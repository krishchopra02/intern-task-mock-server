const router = require('express').Router()
const {
  displayLeaderBoard,
  displayLeaderBoardByCountry,
} = require('../controllers/leaderboard.js')

router.get('/', displayLeaderBoard)
router.get('/:country', displayLeaderBoardByCountry)

module.exports = router
