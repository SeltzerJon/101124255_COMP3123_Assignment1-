const express = require("express")
const employeesRoutes = require("./routes/employees")
const userRoutes = require("./routes/users")
const mongoose = require("mongoose")

const app = express()

const SERVER_PORT = 3001

app.use(express.json())
app.use(express.urlencoded())
const DB_CONNECTION_STRING = "mongodb+srv://bestfriends90:QQTpvzbnjhVKVd3L@cluster0.2yrqiyw.mongodb.net/Fall_comp3123_assigment1?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeesRoutes);


app.route("/")
    .get((req, res) => {
        res.send("<h1>Assignment 1</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})