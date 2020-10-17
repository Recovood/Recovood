const { gql, UserInputError } = require("apollo-server");
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
    addCart(newCart: cartInput): [Cart],

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
      let UserId = context.user.id
      let {
        FoodId,
        quantity,
        status
      }= args.newCart

      let result = await Axios({
        method: "POST",
        url: `${urlCart}/carts`,
        data: {
          UserId,
          FoodId,
          quantity,
          status
        }
      })
        .then(({data}) => {
          return data
        })
        .catch((error) => {
          throw new UserInputError(error.response.data.errors[0], error.statusCode); 
        })
      console.log(result, "<<<<<");
      return result
    }
  }
}

module.exports = { typeDefs, resolvers };