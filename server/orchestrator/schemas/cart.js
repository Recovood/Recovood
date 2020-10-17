const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const { default: Axios } = require("axios");
const urlCart = "http://localhost:4040"

const typeDefs = gql`
  type Cart{
    id: ID,
    UserId: Int,
    FoodId: Int,
    quantity: Int,
    status: String
  }  

  extend type Query {
    getCart: [Cart]
  }

  extend type Mutation {
    addCart(newCart: cartInput): Cart,

  }

  input cartInput{
    FoodId: Int,
    quantity: Int,
    status: String
  }
`;

const resolvers = {
  Mutation: {
    addCart: async(_, args, context) => {
      try {
        if (context.user === undefined){
          throw("auth error")
        }
        let UserId = context.user.id
        let {
          FoodId,
          quantity,
          status
        }= args.newCart
  
        let {data} = await Axios({
          method: "POST",
          url: `${urlCart}/carts`,
          data: {
          }
        })
        
        console.log(data, "<<<<<");
        return data
      } catch (error) {
        if (error === "auth error"){
          throw new AuthenticationError("must be authenticated")
        } else {
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        }
      }

    }
  }
}

module.exports = { typeDefs, resolvers };