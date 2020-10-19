const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const { default: Axios } = require("axios");
const urlCart = "http://localhost:4040"

const typeDefs = gql`
  type Cart{
    id: ID,
    UserId: Int,
    FoodId: Int,
    quantity: Int,
    status: String,
    Food: Food
  }

  type paymentBankResponse{
    statusMessage: String,
    transactionId: String,
    orderId: String,
    totalPrice: String,
    paymentType: String,
    transactionTime: String,
    transactionStatus: String,
    vaNumber: String,
    bank: String
  }

  type MessageCart{
    message: String
  }

  extend type Query {
    getAllCarts: [Cart]
  }

  extend type Mutation {
    addCart(newCart: cartInput): Cart,
    updateCartQuantity(id: ID, newCart: cartInput): Cart,
    deleteCart(id: ID): MessageCart
    paymentBank(paymentInfo: paymentBankInput): paymentBankResponse
  }

  input paymentBankInput{
    paymentType: String,
    bankName: String,
    orderId: String,
    totalPrice: String,
  }

  input cartInput{
    FoodId: Int,
    quantity: Int,
    status: String
  }
`;

const resolvers = {
  Query: {
    getAllCarts: async(_, args, context) => {
      try {
        if (context.user === undefined){
          throw("auth error")
        }
        let UserId = context.user.id
        console.log(context.user.id, "<<user"); 
        let {data} = await Axios({
          method: "GET",
          url: `${urlCart}/carts`,
          headers: {
            user_id: +UserId
          }
        })
        
        data = data.carts
        console.log(data);
        return data
      } catch (error) {
        if (error === "auth error"){
          throw new AuthenticationError("must be authenticated")
        } else if (error.statusCode === 400) {
          console.log(error);
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        } else{
          return error
        }
      }

    }
  },
  Mutation: {
    addCart: async(_, args, context) => {
      try {
        if (context.user === undefined){
          throw("auth error")
        }
        let UserId = context.user.id
        let id = args.id
        let {
          FoodId,
          quantity,
          status
        }= args.newCart
        
        console.log(status, "sebelum");
        let {data} = await Axios({
          method: "POST",
          url: `${urlCart}/carts`,
          headers: {
            user_id: +UserId
          },
          data: {
            FoodId,
            quantity,
            status
          }
        })
        
        console.log(data, "<<<<<");
        return data
      } catch (error) {
        if (error === "auth error"){
          throw new AuthenticationError("must be authenticated")
        } else if (error.statusCode === 400) {
          console.log(error);
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        } else{
          return error
        }
      }

    },
    updateCartQuantity: async(_, args, context) => {
      try {
        if (context.user === undefined){
          throw("auth error")
        }
        let id = args.id
        let UserId = context.user.id
        let {
          quantity,
        }= args.newCart
  
        let {data} = await Axios({
          method: "PATCH",
          url: `${urlCart}/carts/${id}`,
          headers: {
            user_id: +UserId
          },
          data: {
            quantity,
          }
        })
        
        return data
      } catch (error) {
        if (error === "auth error"){
          throw new AuthenticationError("must be authenticated")
        } else if (error.statusCode === 400) {
          console.log(error);
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        } else{
          return error
        }
      }
    },

    deleteCart: async(_, args, context) => {
      try {
        if (context.user === undefined){
          throw("auth error")
        }
        let id = args.id
        let UserId = context.user.id
  
        let {data} = await Axios({
          method: "DELETE",
          url: `${urlCart}/carts/${id}`,
          headers: {
            user_id: +UserId
          },
        })
        
        return data
      } catch (error) {
        if (error === "auth error"){
          throw new AuthenticationError("must be authenticated")
        } else if (error.statusCode === 400) {
          console.log(error);
          throw new UserInputError(error.response.data.errors[0], error.statusCode)
        } else{
          return error
        }
      }
    },

    // payment: async (_, args, context) => {
    //   try {
    //     if (context.user === undefined){
    //       throw("auth error")
    //     }
    //     // let UserId = context.user.id
    //     // let id = args.id
    //     // let {
    //     // }= args.newCart
  
    //     let {data} = await Axios({
    //       method: "POST",
    //       url: `${urlCart}/midtrans`,
    //       //not ready for production | add customer details by sending data to this endpoint
    //     })
        
    //     console.log(data, "<<<<<cartresolver");
    //     return data.midtransResponse
    //   } catch (error) {
    //     if (error === "auth error"){
    //       throw new AuthenticationError("must be authenticated")
    //     } else if (error.statusCode === 400) {
    //       console.log(error);
    //       throw new UserInputError(error.response.data.errors[0], error.statusCode)
    //     } else{
    //       return error
    //     }
    //   }
    // },

    paymentBank: async (_, args, context) => {
      const {     
        paymentType,
        bankName,
        orderId,
        totalPrice
      } = args.paymentInfo
      const {username, email} = context.user
      console.log(args.paymentInfo, username, email)
    }
  }
}

module.exports = { typeDefs, resolvers };