import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use('/*', cors());

app.get("/user", (c) => {
    return c.json({ message: "Hello from the user route!" });
});

app.post("/signUp", async (c) => {
    const { email, password } = await c.req.json();

    
    return c.json({
        data: {
            email,
            password
        },
        message: "Details received from Frontend"
    });
});

export default app;