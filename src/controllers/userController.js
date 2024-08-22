const Employee = require("../models/userModel");
const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid');

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
        const existingUser = await Employee.findOne(username)
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
        const employee = await Employee.findOne(username);
        if(!employee){
            return res.status(400).json({message: "Invalid username"});
        }
        const password = await bcrypt.compare(password, employee.password);
        if(!password){
            return res.status(400).json({message:"Invalid password....."});
        }
        return res.status(200).json({message: "employee login successfully......"})
    } catch (error) {
        return res.status(500).json({error});
        
    }
}

const getEmployee = async(req,res)=>{
    const {id} = req.params;
    try {
        const employee = await Employee.findById(id);
        if(!employee){
            return res.status(400).json({message: "employee not found"})
        }
        return res.status(200).json({message: "employee data..."})
    } catch (error) {
        return res.status(500).json({message: "error retriving data"})
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
        const employee = await User.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "employee not found" });
        }
        await employee.remove();
        res.status(200).json({ message: "employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error occurred" });
    }
};



module.exports = {register, login, getEmployee, deleteEmployee, getAllEmployee};