const Users = require('../models/user.modal');

module.exports.createUser = async(req,res) =>{
    try{
     const {firstName,lastName,email,address,password} = req.body

    
     const newUser = new Users({
       firstName,lastName,password,email,address
      });

      await newUser.save();

    res.status(201).json({ message: 'Users created successfully' });

    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports.getAllUsers=async(req, res)=> {
    try {
      const user = await Users.find();
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching staff members:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }