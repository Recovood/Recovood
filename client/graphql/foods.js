import { gql } from "@apollo/client";

export const FIND_ALL_FOODS = gql`
  query getFoods {
    getFoods {
      id
      name
      image_url
      price
      stock
      ingredient
      RestaurantId
    }
  }
`;

export const FIND_FOOD_BY_ID = gql`
  query getFood($id: ID!) {
    getFood(id: $id) {
      id
      name
      image_url
      price
      stock
      ingredient
      RestaurantId
    }
  }
`;