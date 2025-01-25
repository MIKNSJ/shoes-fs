import express from "express";
import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from "dotenv";
import {generateToken} from "./middleware.js"
import cookieParser from "cookie-parser";
const app = express();
const port = 8080;
const prisma = new PrismaClient();



dotenv.config(); // retrieve contents from .env
app.use(cookieParser());
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data


/*app.get("/", (req, res) => {
    res.send("Your nodemon server is currently active.");
})*/


app.get("/api", (req, res) => {
    res.send("Your nodemon server is currently active.");
});


app.post("/api/users/create", async (req, res) => {
    const userInputEmail = req.body.email;

    if (userInputEmail.indexOf("@") === -1) {
        res.status(400).json({"Email": "Not in correct <name>@<service>.<domain> format."});
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userInputEmail,
        },
    });

    if (!user) {
        const new_user = await prisma.user.create(
            {
                data: {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                }
            }
        );
        res.redirect("/account/login");
    } else {
        res.status(400).json({[userInputEmail]: "already exists."})
    }
});


app.post("/api/users/login", async (req, res) => {
    const userInputEmail = req.body.email;

    if (userInputEmail.indexOf("@") === -1) {
        res.status(400).json({"Email": "Not in correct <name>@<service>.<domain> format."});
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userInputEmail,
        },
    });

    if (user) {
        if (req.body.password === user.password) {
            const token = generateToken(user.username);
            res.cookie("token", token, {httpOnly: true});
            res.redirect("/");
        } else {
            res.status(400).json({[userInputEmail]: "account details are incorrect."})
        }
    } else {
        res.status(400).json({[userInputEmail]: "does not exist."})
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`)
});
