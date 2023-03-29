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