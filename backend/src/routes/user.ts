import { Hono } from "hono";
import prisma from '../dbSeed'

const app = new Hono();

app.get("/user", (c) => {
    return c.json({ message: "Hello from the user route!" });
});