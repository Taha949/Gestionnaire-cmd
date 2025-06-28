import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum CommandeStatut {
  NOUVELLE = "NOUVELLE",
  EPREPARATIONN = "EPREPARATIONN",
  PRETE = "PRETE",
  PROBLEME = "PROBLEME",
  SERVIE = "SERVIE",
  ANNULEE = "ANNULEE"
}

export enum Role {
  SERVEUR = "SERVEUR",
  CUISINIER = "CUISINIER"
}



type EagerCategorie = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categorie, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nom: string;
  readonly Dishes?: (Dish | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategorie = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categorie, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nom: string;
  readonly Dishes: AsyncCollection<Dish>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Categorie = LazyLoading extends LazyLoadingDisabled ? EagerCategorie : LazyCategorie

export declare const Categorie: (new (init: ModelInit<Categorie>) => Categorie) & {
  copyOf(source: Categorie, mutator: (draft: MutableModel<Categorie>) => MutableModel<Categorie> | void): Categorie;
}

type EagerDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly description?: string | null;
  readonly prix?: number | null;
  readonly visible?: boolean | null;
  readonly ingredient?: string[] | null;
  readonly categorieID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly description?: string | null;
  readonly prix?: number | null;
  readonly visible?: boolean | null;
  readonly ingredient?: string[] | null;
  readonly categorieID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Dish = LazyLoading extends LazyLoadingDisabled ? EagerDish : LazyDish

export declare const Dish: (new (init: ModelInit<Dish>) => Dish) & {
  copyOf(source: Dish, mutator: (draft: MutableModel<Dish>) => MutableModel<Dish> | void): Dish;
}

type EagerServeur = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Serveur, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly sub?: string | null;
  readonly role?: Role | keyof typeof Role | null;
  readonly Commandes?: (Commande | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyServeur = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Serveur, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly sub?: string | null;
  readonly role?: Role | keyof typeof Role | null;
  readonly Commandes: AsyncCollection<Commande>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Serveur = LazyLoading extends LazyLoadingDisabled ? EagerServeur : LazyServeur

export declare const Serveur: (new (init: ModelInit<Serveur>) => Serveur) & {
  copyOf(source: Serveur, mutator: (draft: MutableModel<Serveur>) => MutableModel<Serveur> | void): Serveur;
}

type EagerCommande = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Commande, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly serveurID?: string | null;
  readonly total?: string | null;
  readonly statut: CommandeStatut | keyof typeof CommandeStatut;
  readonly clientCreatedAt?: string | null;
  readonly CommandeParDishes?: (CommandeParDish | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCommande = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Commande, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly serveurID?: string | null;
  readonly total?: string | null;
  readonly statut: CommandeStatut | keyof typeof CommandeStatut;
  readonly clientCreatedAt?: string | null;
  readonly CommandeParDishes: AsyncCollection<CommandeParDish>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Commande = LazyLoading extends LazyLoadingDisabled ? EagerCommande : LazyCommande

export declare const Commande: (new (init: ModelInit<Commande>) => Commande) & {
  copyOf(source: Commande, mutator: (draft: MutableModel<Commande>) => MutableModel<Commande> | void): Commande;
}

type EagerCommandeParDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CommandeParDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly commandeID: string;
  readonly Dish?: Dish | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly commandeParDishDishId?: string | null;
}

type LazyCommandeParDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CommandeParDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly commandeID: string;
  readonly Dish: AsyncItem<Dish | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly commandeParDishDishId?: string | null;
}

export declare type CommandeParDish = LazyLoading extends LazyLoadingDisabled ? EagerCommandeParDish : LazyCommandeParDish

export declare const CommandeParDish: (new (init: ModelInit<CommandeParDish>) => CommandeParDish) & {
  copyOf(source: CommandeParDish, mutator: (draft: MutableModel<CommandeParDish>) => MutableModel<CommandeParDish> | void): CommandeParDish;
}

type EagerPanier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Panier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly serveurID: string;
  readonly PanierParDishes?: (PanierParDish | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPanier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Panier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly serveurID: string;
  readonly PanierParDishes: AsyncCollection<PanierParDish>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Panier = LazyLoading extends LazyLoadingDisabled ? EagerPanier : LazyPanier

export declare const Panier: (new (init: ModelInit<Panier>) => Panier) & {
  copyOf(source: Panier, mutator: (draft: MutableModel<Panier>) => MutableModel<Panier> | void): Panier;
}

type EagerPanierParDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PanierParDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly Dish: Dish;
  readonly panierID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly panierParDishDishId: string;
}

type LazyPanierParDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PanierParDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly Dish: AsyncItem<Dish>;
  readonly panierID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly panierParDishDishId: string;
}

export declare type PanierParDish = LazyLoading extends LazyLoadingDisabled ? EagerPanierParDish : LazyPanierParDish

export declare const PanierParDish: (new (init: ModelInit<PanierParDish>) => PanierParDish) & {
  copyOf(source: PanierParDish, mutator: (draft: MutableModel<PanierParDish>) => MutableModel<PanierParDish> | void): PanierParDish;
}