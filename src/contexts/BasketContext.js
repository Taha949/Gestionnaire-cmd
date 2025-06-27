import { createContext, useState, useEffect, useContext } from "react";
import { Amplify, DataStore } from 'aws-amplify';
import { Panier, PanierParDish, Dish as DishModel } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});
const BasketContextProvider = ({ children }) => {
  const { dbServeur } = useAuthContext();
  const [panier, setPanier] = useState(null);
  const [panierParDishes, setPanierParDishes] = useState([]);
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
        async (panierParDishesRaw) => {
          const panierParDishesWithDish = await Promise.all(
            panierParDishesRaw.map(async (ppd) => {
              console.log("ppd", ppd);
              console.log("ppd.Dish", ppd.Dish);
              console.log("ppd.panierParDishDishId", ppd.panierParDishDishId);
              let dish = ppd.Dish;
              if (!dish || !dish.name) {
                const dishId = ppd.panierParDishDishId || (typeof dish === "string" ? dish : undefined);
                if (dishId) {
                  dish = await DataStore.query(DishModel, dishId);
                }
              }
              return { ...ppd, Dish: dish };
            })
          );
          setPanierParDishes(panierParDishesWithDish);
        }
      );
    }
  }, [panier]);

  const addDishToBasket = async (dish, quantity) => {
    //console.log("adddddd", dish.name, quantity);

    let lePanier = panier || (await createNewpanier());
    // Enregistrer uniquement la relation via l'ID du plat pour éviter toute suppression cascade du modèle Dish
    const newPanierParDish = await DataStore.save(
      new PanierParDish({
        quantity,
        panierID: lePanier.id,
        panierParDishDishId: dish.id,
      })
    );
    // Utiliser le dish tel qu'il est passé (peut contenir ingredient filtré)
    setPanierParDishes([...panierParDishes, { ...newPanierParDish, Dish: dish }]);
  };

  const createNewpanier = async () => {
    const newPanier = await DataStore.save(
      new Panier({ serveurID: dbServeur.id })
    );
    setPanier(newPanier);
    return newPanier;
  };

  const clearBasketContext = async () => {
    if (!panier) {
      console.log("clearBasketContext: pas de panier");
      return;
    }
    // Plutôt que de supprimer les lignes PanierParDish (ce qui semble entraîner la suppression du Dish),
    // on crée simplement un nouveau panier vide et on met à jour l'état local.

    // 1. Vider la liste locale pour que l'UI reflète le panier vide
    setPanierParDishes([]);

    // 2. Créer un nouveau panier pour le serveur courant
    const newPanier = await DataStore.save(new Panier({ serveurID: dbServeur.id }));

    // 3. Mettre à jour l'état afin que les prochains ajouts aillent dans ce nouveau panier
    setPanier(newPanier);

    console.log("clearBasketContext: nouveau panier créé", newPanier.id);
  };

  // Met à jour la quantité d'un élément du panier
  const updateQuantity = async (panierParDish, newQuantity) => {
    if (!panierParDish) return;

    try {
      // Recharger l'objet depuis DataStore pour garantir que c'est une instance valide
      const original = await DataStore.query(PanierParDish, panierParDish.id);

      if (!original) return;

      if (newQuantity <= 0) {
        // On met simplement la quantité à 0 pour garder la trace, sans supprimer l'objet ni le Dish associé
        await DataStore.save(
          PanierParDish.copyOf(original, (updated) => {
            updated.quantity = 0;
          })
        );
        // Retirer visuellement du panier
        setPanierParDishes((cur) => cur.filter((i) => i.id !== panierParDish.id));
        return;
      }

      const saved = await DataStore.save(
        PanierParDish.copyOf(original, (updated) => {
          updated.quantity = newQuantity;
        })
      );

      setPanierParDishes((cur) =>
        cur.map((item) =>
          item.id === saved.id ? { ...saved, Dish: panierParDish.Dish } : item
        )
      );
    } catch (e) {
      console.log("Erreur mise à jour quantité", e);
    }
  };

  console.log("BasketContext: clearBasketContext est", typeof clearBasketContext);
  return (
    <BasketContext.Provider
      value={{ addDishToBasket, panier, panierParDishes, prixTotal, clearBasket: clearBasketContext, updateQuantity }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
export const useBasketContext = () => useContext(BasketContext);
