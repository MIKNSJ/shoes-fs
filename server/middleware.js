import jwt from "jsonwebtoken";
import dotenv from "dotenv";



dotenv.config();


export function generateToken(username) {
    return jwt.sign({"username": username}, process.env.TOKEN_SECRET, { expiresIn: 3000 });
}


// for frontend
export function checkAuthStatus(req, res) {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(403).json({username: null}); // user is not signed in
    }

    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        return res.status(200).json({username: data.username});
    } catch {
        return res.status(403).json({username: null}); // user session has expired
    }
}


// for backend
export function checkCurrentUser(req, res) {
    const token = req.cookies.token;
    
    if (!token) {
        return null;
    }

    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        return data.username;
    } catch {
        return null;
    }
}
