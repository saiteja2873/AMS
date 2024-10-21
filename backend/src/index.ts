import { Hono } from 'hono'
import { Jwt } from 'jsonwebtoken'
import cropRoute from './routes/crop'


const app = new Hono()

app.route('/crop', cropRoute)
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
