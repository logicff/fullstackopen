const express = require('express');
const statisticsService = require('../services/statsService')
const router = express.Router();

/* GET usage metadata. */
router.get('/', async (_, res) => {
  const added_todos = await statisticsService.get_todo_count()
  res.send({
    added_todos
  });
});

module.exports = router;
