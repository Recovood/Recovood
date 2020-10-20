const { gql } = require("apollo-server");
const axios = require("axios");
// const Redis = require("ioredis");
// const redis = new Redis();
const url = "http://localhost:4030/foods";

const typeDefs = gql`
  type Food {
    id: ID
    name: String
    image_url: String
    price: Int
    stock: Int
    ingredient: String
    RestaurantId: ID
    Restaurant: Restaurant
  }

  extend type Query {
    getFoods: [Food]
    getFood(id: ID): Food
  }

  extend type Mutation {
    addFood(
      name: String
      image_url: String
      price: Int
      stock: Int
      ingredient: String
      RestaurantId: ID
    ): Food

    updateFood(
      id: ID
      name: String
      image_url: String
      price: Int
      stock: Int
      ingredient: String
      RestaurantId: ID
    ): Food

    deleteFood(id: ID): Food
  }
`;

const resolvers = {
  Query: {
    async getFoods(_, args) {
      try {
        const { data } = await axios.get(url);
        return data;
      } catch (err) {
        console.log(err, "<<< error from getFoods Query");
      }
    },

    async getFood(_, args, context) {
      try {
        const { data } = await axios.get(`${url}/${args.id}`);
        return data;
      } catch (err) {
        console.log(err, "<<< error from getFood Query");
      }
    },
  },

  Mutation: {
    async addFood(_, args, context) {
      try {
        const { data } = await axios.post(url, args);
        return data;
      } catch (err) {
        console.log(err, "<<< error from addFood");
      }
    },

    async updateFood(_, args, context) {
      try {
        const food = await axios.get(`${url}/${args.id}`);
        if (!food) {
          console.log(`Food is not found with id ${args.id}`);
        } else {
          const { data } = await axios.put(`${url}/${args.id}`, {
            name: args.name,
            image_url: args.image_url,
            price: args.price,
            stock: args.stock,
            ingredient: args.ingredient,
          });
          return data;
        }
      } catch (err) {
        console.log(err, "error from updateFood");
      }
    },

    async deleteFood(_, args, context) {
      try {
        const { food } = await axios.delete(`${url}/${args.id}`);
        return food;
      } catch (err) {
        console.log(err, "<<< error from deleteFood");
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
