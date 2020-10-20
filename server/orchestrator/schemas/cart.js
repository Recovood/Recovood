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

  type Transaction{
    transactionId: String,
    UserId: Int,
    orderId: String,
    totalAmount: Int,
    paymentType: String,
    transactionStatus: String
  }

  type paymentBankResponse{
    statusMessage: String,
    transactionId: String,
    orderId: String,
    totalPrice: Int,
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
    getAllTransactions: [Transaction]
    getMidtransTransaction(midtransTrxId:String): paymentBankResponse
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
    totalPrice: Int,
  }

  input cartInput{
    FoodId: Int,
    quantity: Int,
    status: String
  }
`;

const resolvers = {
  Query: {
    getAllTransactions: async(_, args, context)=> {
      try {
        if (context.user === undefined) {
          throw ("auth error")
        }
        let UserId = context.user.id
        let { data } = await Axios({
          method: "GET",
          url: `${urlCart}/transactions`,
          headers: {
            user_id: +UserId
          }
        })
        console.log(data.transactions)
        data = data.transactions
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
    getAllCarts: async (_, args, context) => {
      try {
        if (context.user === undefined) {
          throw ("auth error")
        }
        let UserId = context.user.id
        console.log(context.user.id, "<<user");
        let { data } = await Axios({
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
    getMidtransTransaction: async(_,args, context)=> {
      console.log("<<<<<<<<<<<<<<<<<< masuk ke sini");
      try {
        if (context.user === undefined) {
          throw ("auth error")
        }
        let { data } = await Axios({
          method: "GET",
          url: `${urlCart}/midtrans/${args.midtransTrxId}`,
        })
        console.log(data)
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
    }
  },
  Mutation: {
    addCart: async (_, args, context) => {
      try {
        if (context.user === undefined) {
          throw ("auth error")
        }
        let UserId = context.user.id
        let id = args.id
        let {
          FoodId,
          quantity,
          status
        } = args.newCart

        console.log(status, "sebelum");
        let { data } = await Axios({
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
    updateCartQuantity: async (_, args, context) => {
      try {
        if (context.user === undefined) {
          throw ("auth error")
        }
        let id = args.id
        let UserId = context.user.id
        let {
          quantity,
        } = args.newCart

        let { data } = await Axios({
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

    deleteCart: async (_, args, context) => {
      try {
        if (context.user === undefined) {
          throw ("auth error")
        }
        let id = args.id
        let UserId = context.user.id

        let { data } = await Axios({
          method: "DELETE",
          url: `${urlCart}/carts/${id}`,
          headers: {
            user_id: +UserId
          },
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




    paymentBank: async (_, args, context) => {
      try {
        console.log("masuk ke graphql")
        const {
          paymentType,
          bankName,
          orderId,
          totalPrice
        } = args.paymentInfo
        const { id, username, email } = context.user
        let { data } = await Axios({
          method: "POST",
          url: `${urlCart}/midtrans`,
          data: {
            paymentType,
            bankName,
            orderId,
            totalPrice,
            username, email, id
          }
        })

        console.log(data, "response dari endopoint midtrans");

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
    }
  }
}

module.exports = { typeDefs, resolvers };