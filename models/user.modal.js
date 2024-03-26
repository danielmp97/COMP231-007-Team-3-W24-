const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
