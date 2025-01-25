import jwt from "jsonwebtoken";
import dotenv from "dotenv";



dotenv.config();


export function generateToken(username) {
    return jwt.sign({"username": username}, process.env.TOKEN_SECRET, { expiresIn: "3000" });
}
