const express = require("express")
const UserModel = require("../models/UsersModel")
const routes = express.Router()

routes.post("/signup", async(req, res) => {
    //res.send({message: "Add NEW Book"})
    try {
        const newUser = new UserModel(req.body)
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send({message: "Error while inserting new user"})
    }

})

routes.post("/login", async(req, res) => {
    const { username, password } = req.body;

    const authenticatedUser = await UserModel.findOne({ username, password });
    if (authenticatedUser) {
        // Authentication Succesful
        res.status(200).send({ message: "Login successful", user: authenticatedUser });
      } else {
        // Authentication failed
        res.status(401).send({ message: "Authentication failed" });
      }
    });

module.exports = routes