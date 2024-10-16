import { Hono } from "hono";

const app = new Hono();

app.get("/user", (c) => {
    return c.json({ message: "Hello from the user route!" });
});

app.post("/costTracking", async (c) =>{
    const [ crop, state, district ] = await c.req.json()

    return c.json({
        data : {
            crop,
            state,
            district
        },
        message : "Details received from Frontend"
    })
})