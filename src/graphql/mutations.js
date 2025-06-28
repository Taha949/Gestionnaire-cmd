/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCategorie = /* GraphQL */ `
  mutation CreateCategorie(
    $input: CreateCategorieInput!
    $condition: ModelCategorieConditionInput
  ) {
    createCategorie(input: $input, condition: $condition) {
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
export const updateCategorie = /* GraphQL */ `
  mutation UpdateCategorie(
    $input: UpdateCategorieInput!
    $condition: ModelCategorieConditionInput
  ) {
    updateCategorie(input: $input, condition: $condition) {
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
export const deleteCategorie = /* GraphQL */ `
  mutation DeleteCategorie(
    $input: DeleteCategorieInput!
    $condition: ModelCategorieConditionInput
  ) {
    deleteCategorie(input: $input, condition: $condition) {
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
export const createDish = /* GraphQL */ `
  mutation CreateDish(
    $input: CreateDishInput!
    $condition: ModelDishConditionInput
  ) {
    createDish(input: $input, condition: $condition) {
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
export const updateDish = /* GraphQL */ `
  mutation UpdateDish(
    $input: UpdateDishInput!
    $condition: ModelDishConditionInput
  ) {
    updateDish(input: $input, condition: $condition) {
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
export const deleteDish = /* GraphQL */ `
  mutation DeleteDish(
    $input: DeleteDishInput!
    $condition: ModelDishConditionInput
  ) {
    deleteDish(input: $input, condition: $condition) {
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
export const createServeur = /* GraphQL */ `
  mutation CreateServeur(
    $input: CreateServeurInput!
    $condition: ModelServeurConditionInput
  ) {
    createServeur(input: $input, condition: $condition) {
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
export const updateServeur = /* GraphQL */ `
  mutation UpdateServeur(
    $input: UpdateServeurInput!
    $condition: ModelServeurConditionInput
  ) {
    updateServeur(input: $input, condition: $condition) {
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
export const deleteServeur = /* GraphQL */ `
  mutation DeleteServeur(
    $input: DeleteServeurInput!
    $condition: ModelServeurConditionInput
  ) {
    deleteServeur(input: $input, condition: $condition) {
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
export const createCommande = /* GraphQL */ `
  mutation CreateCommande(
    $input: CreateCommandeInput!
    $condition: ModelCommandeConditionInput
  ) {
    createCommande(input: $input, condition: $condition) {
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
export const updateCommande = /* GraphQL */ `
  mutation UpdateCommande(
    $input: UpdateCommandeInput!
    $condition: ModelCommandeConditionInput
  ) {
    updateCommande(input: $input, condition: $condition) {
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
export const deleteCommande = /* GraphQL */ `
  mutation DeleteCommande(
    $input: DeleteCommandeInput!
    $condition: ModelCommandeConditionInput
  ) {
    deleteCommande(input: $input, condition: $condition) {
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
export const createCommandeParDish = /* GraphQL */ `
  mutation CreateCommandeParDish(
    $input: CreateCommandeParDishInput!
    $condition: ModelCommandeParDishConditionInput
  ) {
    createCommandeParDish(input: $input, condition: $condition) {
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
export const updateCommandeParDish = /* GraphQL */ `
  mutation UpdateCommandeParDish(
    $input: UpdateCommandeParDishInput!
    $condition: ModelCommandeParDishConditionInput
  ) {
    updateCommandeParDish(input: $input, condition: $condition) {
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
export const deleteCommandeParDish = /* GraphQL */ `
  mutation DeleteCommandeParDish(
    $input: DeleteCommandeParDishInput!
    $condition: ModelCommandeParDishConditionInput
  ) {
    deleteCommandeParDish(input: $input, condition: $condition) {
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
export const createPanier = /* GraphQL */ `
  mutation CreatePanier(
    $input: CreatePanierInput!
    $condition: ModelPanierConditionInput
  ) {
    createPanier(input: $input, condition: $condition) {
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
export const updatePanier = /* GraphQL */ `
  mutation UpdatePanier(
    $input: UpdatePanierInput!
    $condition: ModelPanierConditionInput
  ) {
    updatePanier(input: $input, condition: $condition) {
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
export const deletePanier = /* GraphQL */ `
  mutation DeletePanier(
    $input: DeletePanierInput!
    $condition: ModelPanierConditionInput
  ) {
    deletePanier(input: $input, condition: $condition) {
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
export const createPanierParDish = /* GraphQL */ `
  mutation CreatePanierParDish(
    $input: CreatePanierParDishInput!
    $condition: ModelPanierParDishConditionInput
  ) {
    createPanierParDish(input: $input, condition: $condition) {
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
export const updatePanierParDish = /* GraphQL */ `
  mutation UpdatePanierParDish(
    $input: UpdatePanierParDishInput!
    $condition: ModelPanierParDishConditionInput
  ) {
    updatePanierParDish(input: $input, condition: $condition) {
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
export const deletePanierParDish = /* GraphQL */ `
  mutation DeletePanierParDish(
    $input: DeletePanierParDishInput!
    $condition: ModelPanierParDishConditionInput
  ) {
    deletePanierParDish(input: $input, condition: $condition) {
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
