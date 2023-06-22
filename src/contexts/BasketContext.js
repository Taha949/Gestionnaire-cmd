import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Panier, PanierParDish } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});
const BasketContextProvider = ({ children }) => {
  const { dbServeur } = useAuthContext();
  const [panier, setPanier] = useState(null);
  const [panierParDishes, setPanierParDishes] = useState([]);
  console.log(panierParDishes.Dish);
  const prixTotal = panierParDishes.reduce(
    (sum, panierParDish) =>
      sum + panierParDish.quantity * panierParDish.Dish.prix,
    0
  );

  useEffect(() => {
    DataStore.query(Panier, (p) => p.serveurID("eq", dbServeur.id)).then(
      (paniers) => setPanier(paniers[0])
    );
  }, [dbServeur]);

  useEffect(() => {
    if (panier) {
      DataStore.query(PanierParDish, (pd) => pd.panierID("eq", panier.id)).then(
        setPanierParDishes
      );
    }
  }, [panier]);

  console.log(panierParDishes.Dish);
  const addDishToBasket = async (dish, quantity) => {
    //console.log("adddddd", dish.name, quantity);

    let lePanier = panier || (await createNewpanier());
    const newDish = await DataStore.save(
      new PanierParDish({ quantity, Dish: dish, panierID: lePanier.id })
    );
    setPanierParDishes([...panierParDishes, newDish]);
  };

  const createNewpanier = async () => {
    const newPanier = await DataStore.save(
      new Panier({ serveurID: dbServeur.id })
    );
    setPanier(newPanier);
    return newPanier;
  };

  return (
    <BasketContext.Provider
      value={{ addDishToBasket, panier, panierParDishes, prixTotal }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
export const useBasketContext = () => useContext(BasketContext);
