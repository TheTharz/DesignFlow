import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('hello');
        const response = await axios.get('/api/users/profiledata/my');
        setUser(response.data.user);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    // Fetch user data only if user is null
    if (!user) {
      fetchUserData();
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
