const express = require("express")
const EmployeeModel = require("../models/EmployeesModel")
const routes = express.Router()


//Get All employees
routes.get("/employees", async (req, res) => {
    try {
        const employeeList = await EmployeeModel.find({})
        res.status(200).send(employeeList)
    } catch (error) {
        res.status(500).send({message: "No employee Found"})
    }
})

//Add NEW employee
routes.post("/employees", async(req, res) => {
    //res.send({message: "Add NEW Book"})
    try {
        const newEmployee = new EmployeeModel(req.body)
        await newEmployee.save()
        res.status(201).send(newEmployee)
    } catch (error) {
        res.status(500).send({message: "Error while inserting new employee"})
    }

})


// Get employee details by ID
routes.get("/employee/:employeeid", async (req, res) => {
    try {
        const employeeId = req.params.employeeid;

        const employee = await EmployeeModel.findById(employeeId);

        if (!employee) {
            return res.status(404).send({ message: "Employee not found" });
        }

        res.status(200).send(employee);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Update existing employee By Id
routes.put("/employee/:employeeid", async (req, res) => {
    //res.send({message: "Update existing Book By Id"})
    try {
        // console.log(req.body)
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(req.params.employeeid, req.body)
        const nb = await updatedEmployee.save()
        res.status(200).send(nb)
      } catch (err) {
        res.status(500).send({message: "Employee not found"})
      }
})

//Delete employee By ID
routes.delete("/employee/:employeeid", async (req, res) => {
//res.send({message: "Delete Book By ID"})
    try {
        const employee = await EmployeeModel.findByIdAndDelete(req.params.employeeid);

        if (!employee) { 
            res.status(204).send("No employee found");
        } else {
            res.status(200).send(employee);
        }
    } catch (err) {
        res.status(500).send("No employee found");
    }
});

module.exports = routes