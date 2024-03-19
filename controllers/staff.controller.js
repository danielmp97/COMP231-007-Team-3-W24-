const Staff = require('../models/staff.model');

async function createStaff(req, res) {
  try {
    const { name, email, role, password } = req.body;

    // Check if email already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newStaff = new Staff({
      name,
      email,
      role,
      password
    });

    await newStaff.save();

    res.status(201).json({ message: 'Staff member created successfully' });
  } catch (error) {
    console.error('Error creating staff member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllStaff(req, res) {
  try {
    const staffMembers = await Staff.find();
    res.status(200).json(staffMembers);
  } catch (error) {
    console.error('Error fetching staff members:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getStaffById(req, res) {
  try {
    const staffId = req.params.id;
    const staffMember = await Staff.findById(staffId);
    if (!staffMember) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(200).json(staffMember);
  } catch (error) {
    console.error('Error fetching staff member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateStaff(req, res) {
  try {
    const staffId = req.params.id;
    const updateData = req.body;
    const updatedStaff = await Staff.findByIdAndUpdate(staffId, updateData, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    console.error('Error updating staff member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteStaff(req, res) {
  try {
    const staffId = req.params.id;
    const deletedStaff = await Staff.findByIdAndDelete(staffId);
    if (!deletedStaff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createStaff, getAllStaff, getStaffById, updateStaff, deleteStaff };
