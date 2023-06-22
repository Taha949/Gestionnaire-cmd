import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum CommandeStatut {
  EPREPARATIONN = "EPREPARATIONN",
  PRETE = "PRETE",
  ANNULEE = "ANNULEE"
}



type EagerCommandeParDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CommandeParDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Dish?: Dish | null;
  readonly commandeID: string;
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
  readonly Dish: AsyncItem<Dish | undefined>;
  readonly commandeID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly commandeParDishDishId?: string | null;
}

export declare type CommandeParDish = LazyLoading extends LazyLoadingDisabled ? EagerCommandeParDish : LazyCommandeParDish

export declare const CommandeParDish: (new (init: ModelInit<CommandeParDish>) => CommandeParDish) & {
  copyOf(source: CommandeParDish, mutator: (draft: MutableModel<CommandeParDish>) => MutableModel<CommandeParDish> | void): CommandeParDish;
}

type EagerCommande = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Commande, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly serveurID: string;
  readonly total: number;
  readonly statut: CommandeStatut | keyof typeof CommandeStatut;
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
  readonly serveurID: string;
  readonly total: number;
  readonly statut: CommandeStatut | keyof typeof CommandeStatut;
  readonly CommandeParDishes: AsyncCollection<CommandeParDish>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Commande = LazyLoading extends LazyLoadingDisabled ? EagerCommande : LazyCommande

export declare const Commande: (new (init: ModelInit<Commande>) => Commande) & {
  copyOf(source: Commande, mutator: (draft: MutableModel<Commande>) => MutableModel<Commande> | void): Commande;
}

type EagerPanierParDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PanierParDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly Dish?: Dish | null;
  readonly panierID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly panierParDishDishId?: string | null;
}

type LazyPanierParDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PanierParDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly Dish: AsyncItem<Dish | undefined>;
  readonly panierID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly panierParDishDishId?: string | null;
}

export declare type PanierParDish = LazyLoading extends LazyLoadingDisabled ? EagerPanierParDish : LazyPanierParDish

export declare const PanierParDish: (new (init: ModelInit<PanierParDish>) => PanierParDish) & {
  copyOf(source: PanierParDish, mutator: (draft: MutableModel<PanierParDish>) => MutableModel<PanierParDish> | void): PanierParDish;
}

type EagerPanier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Panier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly PanierParDishes?: (PanierParDish | null)[] | null;
  readonly serveurID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPanier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Panier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly PanierParDishes: AsyncCollection<PanierParDish>;
  readonly serveurID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Panier = LazyLoading extends LazyLoadingDisabled ? EagerPanier : LazyPanier

export declare const Panier: (new (init: ModelInit<Panier>) => Panier) & {
  copyOf(source: Panier, mutator: (draft: MutableModel<Panier>) => MutableModel<Panier> | void): Panier;
}

type EagerServeur = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Serveur, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Commandes?: (Commande | null)[] | null;
  readonly sub?: string | null;
  readonly Paniers?: (Panier | null)[] | null;
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
  readonly Commandes: AsyncCollection<Commande>;
  readonly sub?: string | null;
  readonly Paniers: AsyncCollection<Panier>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Serveur = LazyLoading extends LazyLoadingDisabled ? EagerServeur : LazyServeur

export declare const Serveur: (new (init: ModelInit<Serveur>) => Serveur) & {
  copyOf(source: Serveur, mutator: (draft: MutableModel<Serveur>) => MutableModel<Serveur> | void): Serveur;
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
  readonly ingredient?: string[] | null;
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
  readonly ingredient?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Dish = LazyLoading extends LazyLoadingDisabled ? EagerDish : LazyDish

export declare const Dish: (new (init: ModelInit<Dish>) => Dish) & {
  copyOf(source: Dish, mutator: (draft: MutableModel<Dish>) => MutableModel<Dish> | void): Dish;
}