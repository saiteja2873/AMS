import { Hono } from "hono";
import { cors } from "hono/cors";
import prisma from "../dbSeed";
import * as jwt from 'jsonwebtoken';
import { Role } from "@prisma/client";

const app = new Hono();
app.use('/*', cors());

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

app.get("/user", (c) => {
    return c.json({ message: "Hello from the user route!" });
});

app.post("/signUp", async (c) => {
    const { email, password } = await c.req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return c.json({ message: "User already exists" }, 204);
    }
    const hashedPassword = await Bun.password.hash(password);

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        });
        // Generate a JWT token
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '7h' });

        return c.json({
            data: {
                email: newUser.email,
            },
            message: "User created successfully",
            token,
        });
    } catch (err) {
        console.log(err);
        return c.json({ message: "Error creating user" }, 500);
    }
});

app.post("/login", async (c) => {
    const { email, password } = await c.req.json();
    console.log(email, password);
    const user = await prisma.user.findFirst({ where: { email } });
    if (user === null ) {
        return c.json({ message: "User not found" }, 204);
    }
    const isPasswordValid = await Bun.password.verify(password, user.password);
    if (!isPasswordValid) {
        return c.json({ message: "Invalid credentials" }, 203);
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '7h' });

    return c.json({
        message: "Login successful",
        token,
        isAuthenticated: true,
        role: user.role
    });
});

export default app;
