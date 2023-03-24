import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Main.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log('No such document!');
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <div className='main'>
      <h2 className='header'>Profile</h2>
      <div className='card'>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
        <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
        <p><strong>State:</strong> {userData.state}</p>
        <p><strong>Favorite Team:</strong> {userData.favoriteTeam}</p>
      </div>
    </div>
  );
};

export default Profile;
