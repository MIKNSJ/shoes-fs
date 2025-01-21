import express from "express";
//import cors from "cors";
const app = express();
const port = 8080
/*const clientAddress = {
    origin: ["http://localhost:5173/"],
};
app.use(cors(clientAddress));*/



app.get("/", (req, res) => {
    res.send("Your nodemon server is currently active.");
})


app.get("/api", (req, res) => {
    res.json({"username": "Jimmy", "password": "feajflk"});
})


app.get("/api/test1", (req, res) => {
    res.json({"username": "John", "password": "askfej"});
})


app.get("/admin", (req, res) => {
    res.json({"username": "Jay", "password": "ckefje"});
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
