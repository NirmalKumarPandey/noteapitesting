const express = require("express");
const app = express();
const country = require("./country.json");
const userRouter = require("./routes/userRouters");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log("HTTP Method = " + req.method + ",URL=" + req.url);
    next();
});


app.use("/users", userRouter);
app.use("/note", noteRouter);




app.get("/", (req, res) => {
    res.send("Notes Api Created By Nirmal Kumar");
});
app.get("/quote", (req, res) => {

    // res.json({ status: "Success", msg: "Response receive Successfully" });
    res.status(200).json(country);
});
app.get("/random", (req, res) => {
    let index = Math.floor(Math.random() * country.length);
    let count = country[index];
    res.status(200).json(count);

});

const PORT = process.env.PORT || 5500

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, (req, res) => {
            console.log("Server Started on  Port no " + PORT);
        });

    })
    .catch((err) => {
        console.log(err);
    })

