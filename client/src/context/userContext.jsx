import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get('/api/users/profiledata/my').then((data) => {
        setUser(data.data.user);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
