import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewStaff.css'; 
import Swal from 'sweetalert2';

function ViewStaff() {
  const [staffMember, setStaffMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const URL = 'http://localhost:8000/';

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get('userId');

    const fetchStaffMember = async () => {
      try {
        const response = await axios.get(`${URL}staff/${userId}`);
        setStaffMember(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching staff member:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchStaffMember();
    }
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  const deleteStaffMember = async () => {
    // Display confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this staff member. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    // If user confirms deletion, proceed with deletion
    if (result.isConfirmed) {
      try {
        await axios.delete(`${URL}staff/${staffMember._id}`);
        Swal.fire('Deleted!', 'Staff member has been deleted.', 'success');
        window.location.href = '/view-users'; 
      } catch (error) {
        console.error('Error deleting staff member:', error);
      }
    }
  };

  const editRole = () => {
    setEditing(true);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const saveChanges = async () => {
    try {
      await axios.put(`${URL}staff/${staffMember._id}`, { role: selectedRole });
      Swal.fire('Success!', 'Role updated successfully!', 'success');
      setEditing(false);
      const response = await axios.get(`${URL}staff/${staffMember._id}`);
      setStaffMember(response.data);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Staff Member Information</h2>
      {staffMember ? (
        <div className="staff-card">
          <p><strong>Name:</strong> {staffMember.name}</p>
          <p><strong>Email:</strong> {staffMember.email}</p>
          {editing ? (
            <div>
              <p><strong>Role:</strong> 
                <select value={selectedRole} onChange={handleRoleChange}>
                  <option value="">Select a role</option>
                  <option value="IT staff">IT staff</option>
                  <option value="front desk">Front Desk</option>
                </select>
              </p>
              <button className='save-changes-button' onClick={saveChanges}>
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Role:</strong> {staffMember.role}</p>
              <button className='edit-role-button' onClick={editRole}>
                Edit Role
              </button>
              <button className='delete-staff-button' onClick={deleteStaffMember}>
                Delete Staff Member
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>No staff member found</div>
      )}
    </div>
  );
}

export default ViewStaff;
