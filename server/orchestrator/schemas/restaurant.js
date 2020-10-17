const { gql, AuthenticationError, UserInputError } = require("apollo-server");
const { default: Axios } = require("axios");

const urlRestaurant = "http://localhost:4020"

const typeDefs = gql`
type Restaurant{
  id: ID,
  UserId: Int,
  name: String,
  address: String,
  image_url: String
}

type MessageRestaurant{
  message: String
}
extend type Query{
  getAllRestaurants: [Restaurant]
  getRestaurant(id: ID): Restaurant
}

extend type Mutation{
  addRestaurant(newRestaurant: inputRestaurant): Restaurant
  updateRestaurant(id: ID, newRestaurant: inputRestaurant): Restaurant
  deleteRestaurant(id:ID): MessageRestaurant
}

input inputRestaurant{
  name: String,
  address: String,
  image_url: String
}
`

const resolvers = {
  Query: {
    getAllRestaurants: async () => {    //do not need authentication
      try {

        let { data } = await Axios({
          method: "GET",
          url: `${urlRestaurant}/restaurants`,
        })

        data = data.restaurants
        return data

      } catch (error) {
        if (error.statusCode === 400) {
          console.log(error);
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        } else {
          return error
        }
      }
    },

    getRestaurant: async (_, args, context) => {   //do not need authentication
      try {
        let id = args.id
        console.log(id);
        let { data } = await Axios({
          method: "GET",
          url: `${urlRestaurant}/restaurants/${id}`,
        })  
        console.log(data);
        return data
      } catch (error) {
        if (error.statusCode === 400) {
          console.log(error);
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        } else {
          return error
        }
      }
    }
  },
  Mutation: {
    addRestaurant: async (_, args, context) => {
      try {
        console.log(context.user.id);
        if (context.user === undefined) {
          throw ("auth error")
        }

        let userId = context.user.id
        let {
          name,
          address,
          image_url
        } = args.newRestaurant

        let { data } = await Axios({
          method: "POST",
          url: `${urlRestaurant}/restaurants`,
          headers: {
            user_id: userId
          },
          data: {
            name,
            address,
            image_url
          }
        })
        console.log(data);
        return data
      } catch (error) {
        if (error === "auth error") {
          throw new AuthenticationError("must be authenticated")
        } else if (error.statusCode === 400) {
          console.log(error);
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        } else {
          return error
        }
      }
    },

    updateRestaurant: async (_, args, context) => {
      try {
        if (context.user === undefined) {
          throw ("auth error")
        }
        let id = args.id
        let userId = context.user.id
        let {
          name,
          address,
          image_url
        } = args.newRestaurant

        let { data } = await Axios({
          method: "PUT",
          url: `${urlRestaurant}/restaurants/${id}`,
          headers: {
            user_id: userId
          },
          data: {
            name,
            address,
            image_url
          }
        })

        return data
      } catch (error) {
        if (error === "auth error") {
          throw new AuthenticationError("must be authenticated")
        } else if (error.statusCode === 400) {
          console.log(error);
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        } else {
          return error
        }
      }
    },

    deleteRestaurant: async (_, args, context) => {
      try {
        let id = args.id
        console.log(id);
        let { data } = await Axios({
          method: "Delete",
          url: `${urlRestaurant}/restaurants/${id}`,
        })  
        return data
      } catch (error) {
        if (error.statusCode === 400) {
          console.log(error);
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        } else {
          return error
        }
      }
    }
  }
}

module.exports = { typeDefs, resolvers }