/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategorie = /* GraphQL */ `
  subscription OnCreateCategorie(
    $filter: ModelSubscriptionCategorieFilterInput
  ) {
    onCreateCategorie(filter: $filter) {
      id
      nom
      Dishes {
        items {
          id
          name
          image
          description
          prix
          visible
          ingredient
          categorieID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategorie = /* GraphQL */ `
  subscription OnUpdateCategorie(
    $filter: ModelSubscriptionCategorieFilterInput
  ) {
    onUpdateCategorie(filter: $filter) {
      id
      nom
      Dishes {
        items {
          id
          name
          image
          description
          prix
          visible
          ingredient
          categorieID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategorie = /* GraphQL */ `
  subscription OnDeleteCategorie(
    $filter: ModelSubscriptionCategorieFilterInput
  ) {
    onDeleteCategorie(filter: $filter) {
      id
      nom
      Dishes {
        items {
          id
          name
          image
          description
          prix
          visible
          ingredient
          categorieID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDish = /* GraphQL */ `
  subscription OnCreateDish($filter: ModelSubscriptionDishFilterInput) {
    onCreateDish(filter: $filter) {
      id
      name
      image
      description
      prix
      visible
      ingredient
      categorieID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDish = /* GraphQL */ `
  subscription OnUpdateDish($filter: ModelSubscriptionDishFilterInput) {
    onUpdateDish(filter: $filter) {
      id
      name
      image
      description
      prix
      visible
      ingredient
      categorieID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDish = /* GraphQL */ `
  subscription OnDeleteDish($filter: ModelSubscriptionDishFilterInput) {
    onDeleteDish(filter: $filter) {
      id
      name
      image
      description
      prix
      visible
      ingredient
      categorieID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateServeur = /* GraphQL */ `
  subscription OnCreateServeur($filter: ModelSubscriptionServeurFilterInput) {
    onCreateServeur(filter: $filter) {
      id
      name
      sub
      role
      Commandes {
        items {
          id
          serveurID
          total
          statut
          clientCreatedAt
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateServeur = /* GraphQL */ `
  subscription OnUpdateServeur($filter: ModelSubscriptionServeurFilterInput) {
    onUpdateServeur(filter: $filter) {
      id
      name
      sub
      role
      Commandes {
        items {
          id
          serveurID
          total
          statut
          clientCreatedAt
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteServeur = /* GraphQL */ `
  subscription OnDeleteServeur($filter: ModelSubscriptionServeurFilterInput) {
    onDeleteServeur(filter: $filter) {
      id
      name
      sub
      role
      Commandes {
        items {
          id
          serveurID
          total
          statut
          clientCreatedAt
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCommande = /* GraphQL */ `
  subscription OnCreateCommande($filter: ModelSubscriptionCommandeFilterInput) {
    onCreateCommande(filter: $filter) {
      id
      serveurID
      total
      statut
      clientCreatedAt
      CommandeParDishes {
        items {
          id
          quantity
          commandeID
          createdAt
          updatedAt
          commandeParDishDishId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCommande = /* GraphQL */ `
  subscription OnUpdateCommande($filter: ModelSubscriptionCommandeFilterInput) {
    onUpdateCommande(filter: $filter) {
      id
      serveurID
      total
      statut
      clientCreatedAt
      CommandeParDishes {
        items {
          id
          quantity
          commandeID
          createdAt
          updatedAt
          commandeParDishDishId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCommande = /* GraphQL */ `
  subscription OnDeleteCommande($filter: ModelSubscriptionCommandeFilterInput) {
    onDeleteCommande(filter: $filter) {
      id
      serveurID
      total
      statut
      clientCreatedAt
      CommandeParDishes {
        items {
          id
          quantity
          commandeID
          createdAt
          updatedAt
          commandeParDishDishId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCommandeParDish = /* GraphQL */ `
  subscription OnCreateCommandeParDish(
    $filter: ModelSubscriptionCommandeParDishFilterInput
  ) {
    onCreateCommandeParDish(filter: $filter) {
      id
      quantity
      commandeID
      Dish {
        id
        name
        image
        description
        prix
        visible
        ingredient
        categorieID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      commandeParDishDishId
    }
  }
`;
export const onUpdateCommandeParDish = /* GraphQL */ `
  subscription OnUpdateCommandeParDish(
    $filter: ModelSubscriptionCommandeParDishFilterInput
  ) {
    onUpdateCommandeParDish(filter: $filter) {
      id
      quantity
      commandeID
      Dish {
        id
        name
        image
        description
        prix
        visible
        ingredient
        categorieID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      commandeParDishDishId
    }
  }
`;
export const onDeleteCommandeParDish = /* GraphQL */ `
  subscription OnDeleteCommandeParDish(
    $filter: ModelSubscriptionCommandeParDishFilterInput
  ) {
    onDeleteCommandeParDish(filter: $filter) {
      id
      quantity
      commandeID
      Dish {
        id
        name
        image
        description
        prix
        visible
        ingredient
        categorieID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      commandeParDishDishId
    }
  }
`;
export const onCreatePanier = /* GraphQL */ `
  subscription OnCreatePanier($filter: ModelSubscriptionPanierFilterInput) {
    onCreatePanier(filter: $filter) {
      id
      serveurID
      PanierParDishes {
        items {
          id
          quantity
          panierID
          createdAt
          updatedAt
          panierParDishDishId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePanier = /* GraphQL */ `
  subscription OnUpdatePanier($filter: ModelSubscriptionPanierFilterInput) {
    onUpdatePanier(filter: $filter) {
      id
      serveurID
      PanierParDishes {
        items {
          id
          quantity
          panierID
          createdAt
          updatedAt
          panierParDishDishId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePanier = /* GraphQL */ `
  subscription OnDeletePanier($filter: ModelSubscriptionPanierFilterInput) {
    onDeletePanier(filter: $filter) {
      id
      serveurID
      PanierParDishes {
        items {
          id
          quantity
          panierID
          createdAt
          updatedAt
          panierParDishDishId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePanierParDish = /* GraphQL */ `
  subscription OnCreatePanierParDish(
    $filter: ModelSubscriptionPanierParDishFilterInput
  ) {
    onCreatePanierParDish(filter: $filter) {
      id
      quantity
      Dish {
        id
        name
        image
        description
        prix
        visible
        ingredient
        categorieID
        createdAt
        updatedAt
      }
      panierID
      createdAt
      updatedAt
      panierParDishDishId
    }
  }
`;
export const onUpdatePanierParDish = /* GraphQL */ `
  subscription OnUpdatePanierParDish(
    $filter: ModelSubscriptionPanierParDishFilterInput
  ) {
    onUpdatePanierParDish(filter: $filter) {
      id
      quantity
      Dish {
        id
        name
        image
        description
        prix
        visible
        ingredient
        categorieID
        createdAt
        updatedAt
      }
      panierID
      createdAt
      updatedAt
      panierParDishDishId
    }
  }
`;
export const onDeletePanierParDish = /* GraphQL */ `
  subscription OnDeletePanierParDish(
    $filter: ModelSubscriptionPanierParDishFilterInput
  ) {
    onDeletePanierParDish(filter: $filter) {
      id
      quantity
      Dish {
        id
        name
        image
        description
        prix
        visible
        ingredient
        categorieID
        createdAt
        updatedAt
      }
      panierID
      createdAt
      updatedAt
      panierParDishDishId
    }
  }
`;
