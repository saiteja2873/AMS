import { Hono } from "hono";

const app = new Hono();

app.get('/', async (c) => {
    const { cropName, state, district} = await c.req.json();
    // TODO: Returns the price from database
})

app.post('/', async(c) => {
    const {crop, state, district, msp, marketPrice} =  await c.req.json();
})

export default app;