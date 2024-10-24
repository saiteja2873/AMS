import { Hono } from 'hono'
import { Jwt } from 'jsonwebtoken'
import cropRoute from './routes/crop'
import userRoute from './routes/user'


const app = new Hono()

app.route('/crop', cropRoute)
app.route('/user', userRoute)
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
