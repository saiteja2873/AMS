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
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ message: "Email and password required" }, 400);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json({ message: "User already exists" }, 409);
    }

    const hashedPassword = await Bun.password.hash(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    if (!SECRET_KEY) {
      throw new Error("JWT secret missing");
    }

    const token = jwt.sign(
      { email: newUser.email },
      SECRET_KEY,
      { expiresIn: "7h" }
    );

    return c.json(
      {
        data: { email: newUser.email },
        message: "User created successfully",
        token,
      },
      201
    );
  } catch (err: any) {
    console.error("SIGNUP ERROR:", err);

    // Prisma unique constraint fallback
    if (err?.code === "P2002") {
      return c.json({ message: "User already exists" }, 409);
    }

    return c.json(
      { message: err.message || "Internal Server Error" },
      500
    );
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
