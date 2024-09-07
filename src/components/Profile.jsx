import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ onUpdateProfile }) => {
  const [profileData, setProfileData] = useState({ username: '', email: '', phone: '', location: '' });
  const [newPassword, setNewPassword] = useState('');
  const [editing, setEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setProfileData(storedUser);
      if (storedUser.profilePhoto) {
        setProfilePhotoUrl(storedUser.profilePhoto);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePhoto(file);
      setProfilePhotoUrl(URL.createObjectURL(file));
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfileData = { ...profileData, profilePhoto: profilePhotoUrl };
      localStorage.setItem('user', JSON.stringify(updatedProfileData));
      if (newPassword) {
        console.log('Password updated:', newPassword);
      }

      if (profilePhoto) {
        console.log('Profile photo updated:', profilePhoto.name);
      }

      toast.success('Profile updated successfully');
      setEditing(false);
      onUpdateProfile(updatedProfileData);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  return (
    <Container>
      <Overlay />
      <ProfileBox>
        {profilePhotoUrl && (
          <ProfileImage src={profilePhotoUrl} alt="Profile" />
        )}
        <h2>Profile</h2>
        <Input
          type="text"
          name="username"
          value={profileData.username}
          onChange={handleChange}
          placeholder="Username"
          disabled={!editing}
        />
        <Input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          placeholder="Email"
          disabled={!editing}
        />
        <Input
          type="text"
          name="location"
          value={profileData.location}
          onChange={handleChange}
          placeholder="Location"
          disabled={!editing}
        />
        {editing && (
          <>
            <Input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
            />
            <FileInput
              type="file"
              onChange={handlePhotoChange}
            />
          </>
        )}
        {editing ? (
          <SaveButton onClick={handleSave}>Save</SaveButton>
        ) : (
          <EditButton onClick={() => setEditing(true)}>Edit</EditButton>
        )}
        <ToastContainer />
      </ProfileBox>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1722111059641-be1189421e09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4M3x8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ProfileBox = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const FileInput = styled(Input)`
  padding: 3px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
`;

const EditButton = styled(Button)`
  background-color: green;
`;

const SaveButton = styled(Button)`
  background-color: orange;
`;

const ProfileImage = styled.img`
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;