import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

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
    <div>
      <h2>Profile</h2>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.name}</p>
      <p>Date of Birth: {userData.dateOfBirth}</p>
      <p>Phone Number: {userData.phoneNumber}</p>
      <p>State: {userData.state}</p>
      <p>Favorite Team: {userData.favoriteTeam}</p>
    </div>
  );
};

export default Profile;
