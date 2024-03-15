import { createContext, useState } from "react";

export const userContext = createContext(null);

function CheckUser({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <userContext.Provider value={[isLogged, setIsLogged]}>
      {children}
    </userContext.Provider>
  );
}

export { CheckUser };
