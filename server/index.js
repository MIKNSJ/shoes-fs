import express from "express";
import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from "dotenv";
import { generateToken, checkAuthStatus, checkCurrentUser } from "./middleware.js"
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
    /**
     * Get email from user input.
     */
    const userInputEmail = req.body.email;


    /**
     * check if user email contains a "@" and ".".
     */
    if (userInputEmail.indexOf("@") === -1 || userInputEmail.indexOf(".") === -1) {
        return res.status(400).json({Email: "Not in correct <name>@<service>.<domain> format."});
    }


    /**
     * Look up if user email already exists.
     */
    const user = await prisma.user.findUnique({
        where: {
            email: userInputEmail,
        },
    });


    /**
     * IF SUCCESS: Create a new user.
     * ELSE: The user already exists.
     */
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
        
        return res.redirect("/account/login");
    } else {
        return res.status(400).json({[userInputEmail]: "already exists."})
    }
});


app.post("/api/users/login", async (req, res) => {
    /**
     * Get email from user input.
     */
    const userInputEmail = req.body.email;


    /**
     * check if user email contains a "@" and ".".
     */
    if (userInputEmail.indexOf("@") === -1 || userInputEmail.indexOf(".") === -1) {
        return res.status(400).json({Email: "Not in correct <name>@<service>.<domain> format."});
    }


    /**
     * Look up if user email already exists.
     */
    const user = await prisma.user.findUnique({
        where: {
            email: userInputEmail,
        },
    });


    /**
     * IF SUCCESS: Create a new user if valid password.
     * ELSE: The user already exists.
     */
    if (user) {
        const plainPassword = req.body.password;
        const hashedPassword = user.password;
        const validResult = await bcrypt.compare(plainPassword, hashedPassword);

        if (validResult) {
            const token = generateToken(user.username);
            res.cookie("token", token, {httpOnly: true});
            res.redirect("/");
            return;
        } else {
            return res.status(400).json({[userInputEmail]: "account details are incorrect."})
        }
    } else {
        return res.status(400).json({[userInputEmail]: "does not exist."})
    }
});


app.get("/api/users/logout", async (req, res) => {
    return res.clearCookie("token").status(200).json({User: "SIGNED OUT"});
})


app.get("/api/items", async (req, res) => {
    const allItems = await prisma.item.findMany();
    return res.status(200).send(allItems);
})


app.get(`/api/items/:id/add`, async (req, res) => {
    /**
     * Check if user is signed in to access this route.
     */
    const currentUser = checkCurrentUser(req, res);

    if (!currentUser) {
        return res.status(403).json({User: "NEEDS TO BE SIGNED IN"});
    }


    /**
     * Check if item exists in the database.
     */
    const itemId = Number(req.params.id);
    const item = await prisma.item.findUnique(
        {
            where: {
                id: itemId,
            }
        }
    )

    if (!item) {
        return res.status(400).json({Item: "does not exist."})
    }


    /**
     * Check if item is already in user's cart.
     */
    const cart = await prisma.cart.findUnique(
        {
            where: {
                product_id: item.id, user_cart_name: currentUser
            },
        }
    );


    /**
     * IF SUCCESS: Update the item in the user's cart.
     * ELSE: Add the item to the user's cart.
     */
    if (cart) {
        const newQuantity = cart.quantity + 1;
        const updateCart = await prisma.cart.update(
            {
                where: {
                    product_id: item.id, user_cart_name: currentUser,
                },

                data: {
                    quantity: newQuantity,
                },
            }
        );
    } else {
        const newCartItem = await prisma.cart.create(
            {
                data: {
                    product_id: item.id,
                    name: item.name,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    quantity: 1,
                    user_cart_name: currentUser,
                }
            }
        );
    }

    return res.status(200).json({Item: item});
})


app.get("/api/users/items", async (req, res) => {
    const currentUser = checkCurrentUser(req, res);

    if (!currentUser) {
        return res.status(403).json({User: "NOT SIGNED IN"});
    }

    const allUserItems = await prisma.cart.findMany(
        {
            where: {
                user_cart_name: currentUser,
            },
        },
    );

    return res.status(200).send(allUserItems);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`)
});
