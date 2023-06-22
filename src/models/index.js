// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CommandeStatut = {
  "EPREPARATIONN": "EPREPARATIONN",
  "PRETE": "PRETE",
  "ANNULEE": "ANNULEE"
};

const { CommandeParDish, Commande, PanierParDish, Panier, Serveur, Dish } = initSchema(schema);

export {
  CommandeParDish,
  Commande,
  PanierParDish,
  Panier,
  Serveur,
  Dish,
  CommandeStatut
};