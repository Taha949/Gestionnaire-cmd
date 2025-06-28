// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CommandeStatut = {
  "NOUVELLE": "NOUVELLE",
  "EPREPARATIONN": "EPREPARATIONN",
  "PRETE": "PRETE",
  "PROBLEME": "PROBLEME",
  "SERVIE": "SERVIE",
  "ANNULEE": "ANNULEE"
};

const Role = {
  "SERVEUR": "SERVEUR",
  "CUISINIER": "CUISINIER"
};

const { Categorie, Dish, Serveur, Commande, CommandeParDish, Panier, PanierParDish } = initSchema(schema);

export {
  Categorie,
  Dish,
  Serveur,
  Commande,
  CommandeParDish,
  Panier,
  PanierParDish,
  CommandeStatut,
  Role
};