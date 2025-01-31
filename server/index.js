import express from "express";
import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from "dotenv";
import { generateToken, checkAuthStatus } from "./middleware.js"
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";



const app = express();
const port = 8080;
const prisma = new PrismaClient();
const saltRounds = 10;


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


app.get("/api/users", async (req, res) => {
    return checkAuthStatus(req, res);
})


app.post("/api/users/create", async (req, res) => {
    const userInputEmail = req.body.email;

    if (userInputEmail.indexOf("@") === -1) {
        return res.status(400).json({Email: "Not in correct <name>@<service>.<domain> format."});
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userInputEmail,
        },
    });

    if (!user) {
        const plainPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        const new_user = await prisma.user.create(
            {
                data: {
                    email: req.body.email,
                    username: req.body.username,
                    password: hashedPassword,
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
        return res.status(400).json({Email: "Not in correct <name>@<service>.<domain> format."});
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userInputEmail,
        },
    });

    if (user) {
        const plainPassword = req.body.password;
        const hashedPassword = user.password;
        const validResult = await bcrypt.compare(plainPassword, hashedPassword);

        if (validResult) {
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


app.get("/api/users/logout", async (req, res) => {
    return res.clearCookie("token").status(200).json({User: "SIGNED OUT"});
})


app.get("/api/items", async (req, res) => {
    const allItems = await prisma.item.findMany();
    return res.status(200).send(allItems);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`)
});
