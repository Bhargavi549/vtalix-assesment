const Employee = require("../models/userModel");
const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid');
const jwt = require('jsonwebtoken');

const register = async(req,res)=>{
    const {username, password,phoneNo, email, address} =  req.body;

    if(!(username || password || phoneNo || email || address)){
        return res.status(400).json({message: "Missing required fields"});
    }
    const hashedPassword  = await bcrypt.hash(password.toString(), await bcrypt.genSalt(10))
    const employee = new Employee({
        id: uuidV4,
        user_name : username,
        password: hashedPassword,
        email: email,
        phone_no: phoneNo,
        address: address
    })
    try {
        const existingUser = await Employee.findOne({user_name:username})
        if(existingUser){
            return res.status(402).json({message:"employee already existed"})
        }
        await employee.save();
        return res.status(200).json({message: "employee created successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error occured"})
    }

}

const login = async(req,res)=>{
    const {username,password} = req.body;
    if(!(username && password)){
        return res.status(400).json({message: "missing required fields"});
    }
    try {
        const employee = await Employee.findOne({user_name:username});
        if(!employee){
            return res.status(400).json({message: "Invalid username"});
        }
        const validpassword = await bcrypt.compare(password, employee.password);
        if(!validpassword){
            return res.status(400).json({message:"Invalid password....."});
        }
        return res.status(200).json({message: "employee login successfully......",id})
    } catch (error) {
        console.error(error);
        return res.status(500).json({err: error});
        
    }
}

const getEmployee = async(req,res)=>{
    const {id} = req.params;
    console.log("......",req.params)
    try {
        const employee = await Employee.findById(id);
        if(!employee){
            return res.status(400).json({message: "employee not found"})
        }
        const empDetails = employee.toObject()
        delete empDetails.password
        return res.status(200).json({message: "employee data...", data: empDetails})
    } catch (error) {
        return res.status(500).json({message: "error retriving data", error})
    }
}

const getAllEmployee = async(req,res)=>{
    const {id} = req.params;
    try {
        const employee = await Employee.find();
        return res.status(200).json({employee})
    } catch (error) {
        return res.status(500).json({message: "error retriving data"})
    }
}

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: "employee not found" });
        }
        return res.status(200).json({ message: "employee deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred" , error});
    }
};

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const updateData = {...req.body}
    try {
        if (updateData.password) {
            delete updateData.password;
        }
        const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true});
        if (!employee) {
            return res.status(404).json({ message: "employee not found" });
        }
        return res.status(200).json({ message: "employee updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error occurred" , error});
    }
};

const generateToken = async (req, res) => {
    try {
        const token = jwt.sign(req.body, process.env.JWT_SECRET_KEY, { expiresIn: '2m' })
        return res.status(200).json({ message: "token generated succesfully", token });
    } catch (error) {
        
    }
}



module.exports = {register, login, getEmployee, deleteEmployee, getAllEmployee, updateEmployee, generateToken};