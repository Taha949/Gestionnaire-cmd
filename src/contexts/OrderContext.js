import React, { createContext, useContext, useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Commande, CommandeParDish, Panier, Dish } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbServeur } = useAuthContext();
  const { prixTotal, panierParDishes, panier } = useBasketContext();
  const [commandes, setCommandes] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!dbServeur?.id) return;
    const sub = DataStore.observeQuery(
      Commande,
      (c) => c.serveurID('eq', dbServeur.id)
    ).subscribe(({ items }) => {
      const sorted = [...items].sort((a,b)=>{
        const da=new Date(a.createdAt||0).getTime();
        const db=new Date(b.createdAt||0).getTime();
        return db-da;
      });
      setCommandes(sorted);
    });
    return () => sub.unsubscribe();
  }, [dbServeur?.id]);

  const createOrder = async () => {
    const totalStr = prixTotal.toFixed(2);
    const newCommande = await DataStore.save(
      new Commande({ serveurID: dbServeur.id, statut: 'EPREPARATIONN', total: totalStr })
    );
    await Promise.all(
      panierParDishes.map((ppd) =>
        DataStore.save(
          new CommandeParDish({
            quantity: ppd.quantity,
            commandeID: newCommande.id,
            Dish: ppd.Dish,
            selectedIngredient: ppd.Dish.ingredient?.filter(Boolean) || [],
          })
        )
      )
    );
    setCommandes((prev) => [newCommande, ...prev]);
    return newCommande;
  };

  const getCommande = async (id) => {
    const commande = await DataStore.query(Commande, id);
    if (!commande) {
      throw new Error("La commande n'existe pas.");
    }

    const commandeParDishes = await DataStore.query(
      CommandeParDish,
      (cd) => cd.commandeID("eq", id)
    );

    // Pour chaque CommandeParDish, s'assurer que Dish est bien chargé
    const dishesWithDetails = await Promise.all(
      commandeParDishes.map(async (cpd) => {
        let dish = cpd.Dish;
        if (!dish || !dish.name) {
          // charger via id si nécessaire
          const dishId = cpd.commandeParDishDishId || (typeof dish === "string" ? dish : undefined);
          if (dishId) {
            dish = await DataStore.query(Dish, dishId);
          }
        }
        return { ...cpd, Dish: dish };
      })
    );

    return { ...commande, dishes: dishesWithDetails };
  };

  const computeMetrics = async () => {
    const cpd = await DataStore.query(CommandeParDish, (c) => c.commandeID('eq', commande.id));
    const qtySum = cpd.reduce((s, it) => s + it.quantity, 0);   // <- somme
    setItemsCount(qtySum);

    if (commande.total) { setTotal(parseFloat(commande.total)); return; }

    const sums = await Promise.all(
      cpd.map(async (it) => {
        let d = it.Dish;
        if (!d?.prix) d = await DataStore.query(Dish, it.commandeParDishDishId);
        return (d?.prix || 0) * it.quantity;
      })
    );
    setTotal(sums.reduce((s, v) => s + v, 0));
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
