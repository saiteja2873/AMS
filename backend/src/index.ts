import { Hono } from 'hono'
import { Jwt } from 'jsonwebtoken'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
