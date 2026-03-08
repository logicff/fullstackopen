const express = require('express');
const { Todo } = require('../mongo')
const { add_todo_count } = require('../services/statsService')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* GET todo from listing. */
router.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (todo) {
    res.send(todo);
  } else {
    res.sendStatus(404);
  }
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  await add_todo_count()
  res.send(todo);
});

/* PUT todo to listing. */
router.put('/:id', async (req, res) => {
  const todo = {
    text: req.body.text,
    done: req.body.done || false
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    todo,
    { new: true, runValidators: true }
  )
  if (updatedTodo) {
    res.send(updatedTodo);
  } else {
    res.sendStatus(404);
  }
})

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
