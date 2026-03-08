const redis = require('../redis')

const init_count = async () => {
  const exists = await redis.exists("added_todos")
  if (!exists) {
    await redis.set("added_todos", 0)
  }
}

const get_todo_count = async () => {
  const count = await redis.get("added_todos")
  return parseInt(count) || 0
}

const add_todo_count = async () => {
  const count = await get_todo_count()
  await redis.set("added_todos", count + 1)
}

init_count().catch(err => {
  console.error('Failed to initialize Redis counter:', err)
})

module.exports = {
  get_todo_count ,
  add_todo_count ,
}