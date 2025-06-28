/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategorie = /* GraphQL */ `
  query GetCategorie($id: ID!) {
    getCategorie(id: $id) {
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategorieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nom
        Dishes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDish = /* GraphQL */ `
  query GetDish($id: ID!) {
    getDish(id: $id) {
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
export const listDishes = /* GraphQL */ `
  query ListDishes(
    $filter: ModelDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getServeur = /* GraphQL */ `
  query GetServeur($id: ID!) {
    getServeur(id: $id) {
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
export const listServeurs = /* GraphQL */ `
  query ListServeurs(
    $filter: ModelServeurFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServeurs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        sub
        role
        Commandes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommande = /* GraphQL */ `
  query GetCommande($id: ID!) {
    getCommande(id: $id) {
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
export const listCommandes = /* GraphQL */ `
  query ListCommandes(
    $filter: ModelCommandeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommandes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        serveurID
        total
        statut
        clientCreatedAt
        CommandeParDishes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommandeParDish = /* GraphQL */ `
  query GetCommandeParDish($id: ID!) {
    getCommandeParDish(id: $id) {
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
export const listCommandeParDishes = /* GraphQL */ `
  query ListCommandeParDishes(
    $filter: ModelCommandeParDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommandeParDishes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPanier = /* GraphQL */ `
  query GetPanier($id: ID!) {
    getPanier(id: $id) {
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
export const listPaniers = /* GraphQL */ `
  query ListPaniers(
    $filter: ModelPanierFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaniers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        serveurID
        PanierParDishes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPanierParDish = /* GraphQL */ `
  query GetPanierParDish($id: ID!) {
    getPanierParDish(id: $id) {
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
export const listPanierParDishes = /* GraphQL */ `
  query ListPanierParDishes(
    $filter: ModelPanierParDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPanierParDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const dishesByCategorieID = /* GraphQL */ `
  query DishesByCategorieID(
    $categorieID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dishesByCategorieID(
      categorieID: $categorieID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const commandesByServeurID = /* GraphQL */ `
  query CommandesByServeurID(
    $serveurID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommandeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commandesByServeurID(
      serveurID: $serveurID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        serveurID
        total
        statut
        clientCreatedAt
        CommandeParDishes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commandeParDishesByCommandeID = /* GraphQL */ `
  query CommandeParDishesByCommandeID(
    $commandeID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommandeParDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commandeParDishesByCommandeID(
      commandeID: $commandeID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const paniersByServeurID = /* GraphQL */ `
  query PaniersByServeurID(
    $serveurID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPanierFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paniersByServeurID(
      serveurID: $serveurID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        serveurID
        PanierParDishes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const panierParDishesByPanierID = /* GraphQL */ `
  query PanierParDishesByPanierID(
    $panierID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPanierParDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    panierParDishesByPanierID(
      panierID: $panierID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
