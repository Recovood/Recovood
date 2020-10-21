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

  input inputDistances {
    latitude: Float
    longitude: Float
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

    sendDistances(latLong: inputDistances): [Food] 
  }
`;

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

const resolvers = {
  Query: {
    async getFoods(_, args) {
      console.log("masuk")
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

    async sendDistances(_, args, context) {
      console.log("masuk")
      try {
        const { data } = await axios.get(url);
        // console.log(data);
        console.log(args, "<<<<< args in sendDistances");
        const restaurantNearbies = []
        for (let i = 0; i < data.length; i++) {
          let distance = getDistanceFromLatLonInKm(args.latLong.latitude, args.latLong.longitude, data[i].Restaurant.latitude, data[i].Restaurant.longitude);
          // DISINI BISA GANTI JARAK
          if (distance < 5) {
            restaurantNearbies.push(data[i]);
          }
        }
        return restaurantNearbies;
      } catch(err) {
        console.log(err, "<<<< error in sendDistances");
      }
    }
  },
};

module.exports = { typeDefs, resolvers };
