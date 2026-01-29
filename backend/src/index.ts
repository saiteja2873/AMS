import { Hono } from 'hono'
import { Jwt } from 'jsonwebtoken'
import cropRoute from './routes/crop'
import userRoute from './routes/user'
import prisma from "./dbSeed";


const app = new Hono()

app.route('/crop', cropRoute)
app.route('/user', userRoute)
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get("/health", async (c) => {
  try {
    await prisma.$connect();
    return c.json({ status: "ok", db: "connected" });
  } catch (err) {
    return c.json({ status: "error", db: "not connected" }, 500);
  }
});


export default app
