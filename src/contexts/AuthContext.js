import { createContext, useContext, useEffect, useState } from "react";
import { Serveur } from "../models";
import { DataStore, Auth } from "aws-amplify";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authServeur, setAuthServeur] = useState(null);
  const [dbServeur, setDbServeur] = useState(null);
  const sub = authServeur?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthServeur);
  }, []);

  useEffect(() => {
    DataStore.query(Serveur, (serveur) => serveur.sub("eq", sub)).then(
      (serveurs) => setDbServeur(serveurs[0])
    );
  }, [sub]);

  return (
    <AuthContext.Provider value={{ authServeur, dbServeur, sub, setDbServeur }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
