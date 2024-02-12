import React, { createContext, useState } from 'react';

export const PrivateContext = createContext();

export const PrivateProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <PrivateContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </PrivateContext.Provider>
  );
};