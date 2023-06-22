import React, { createContext, useContext, useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Commande, CommandeParDish, Panier } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbServeur } = useAuthContext();
  const { prixTotal, panierParDishes, panier } = useBasketContext();
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    DataStore.query(Commande, (c) => c.serveurID("eq", dbServeur.id)).then(
      setCommandes
    );
  }, [dbServeur]);

  const createOrder = async () => {
    const newCommande = await DataStore.save(
      new Commande({
        serveurID: dbServeur.id,
        statut: "EPREPARATIONN",
        total: "10",
      })
    );

    await Promise.all(
      panierParDishes.map((panierParDish) =>
        DataStore.save(
          new CommandeParDish({
            quantity: panierParDish.quantity,
            commandeID: newCommande.id,
            Dish: panierParDish.Dish,
          })
        )
      )
    );
    setCommandes([...commandes, newCommande]);
    return newCommande;
  };
  const getCommande = async (id) => {
    const fetchedCommandes = await DataStore.query(Commande, id);
    if (fetchedCommandes.length === 0) {
      throw new Error("La commande n'existe pas.");
    }
    const commande = fetchedCommandes[0];
    const commandeParDishes = await DataStore.query(
      CommandeParDish,
      (cd) => cd.commandeID("eq", id).commande
    );
    return { ...commande, dishes: commandeParDishes };
  };

  return (
    <React.Fragment>
      <OrderContext.Provider value={{ createOrder, commandes, getCommande }}>
        {children}
      </OrderContext.Provider>
    </React.Fragment>
  );
};

export default OrderContextProvider;
export const useOrderContext = () => useContext(OrderContext);
