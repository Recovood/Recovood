const { Cart, sequelize, Food } = require("../models") 

class CartController {
  static async create (req, res, next){
    try {
      // const UserId  = req.userData.id
      const UserId = 1 // for testing purpose delete before production
      const { FoodId, quantity, status } = req.body

      let cartFromDb = await Cart.findOne({where: {UserId, FoodId}, include: [ Food ]}) // Add include: Food | if Food model completed
      
      if(cartFromDb){
        let totalQuantity = +quantity + +cartFromDb.quantity
          
        if(totalQuantity > cartFromDb.Food.stock){
          let err = {
            statusCode: 400,
            message: "Not enough food"
          }
          next(err)
        } else {
          cartFromDb = await Cart.update({quantity: totalQuantity}, {where: {UserId, FoodId}})
          return res.status(201).json({cartFromDb, message: "Successfully adding item to cart"})
        }
      } else{
        
        const newCart = await Cart.create({UserId, FoodId, quantity, status})
        return res.status(201).json({cartFromDb, message: "Successfully adding item to cart"})
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async getCarts(req, rest, next){
    try {
      let UserId  = req.userData.id
      
      let carts = Cart.findAll({where: UserId}) // Add include: Food | if Food model completed

      return res.status(200).json({carts})
    } catch (error) {
      next(error)
    }
  }

  static async updateQuantity(req,res,next){
    try{
      let { id } = req.params //Cart Id
      let { quantity } = req.body

      await Cart.update({quantity}, {where: {id}})

      return res.status(200).json({message: 'Success updating cart'})
    }catch(err){
      next(err)
    }
  }

  static async deleteCart(req,res,next){
    try{
      let {id} = req.params //Cart Id

      await Cart.destroy({where:{id}})

      return res.status(200).json({message: 'Cart successfully deleted'})

    }catch(err){
      next(err)
    }
  }

  static async checkout(req, res, next){
    //waiting for Midtrans intregation  
    try {
      const t = sequelize.transaction()
      let UserId = req.userData.id
      let promises = []
      let carts = Cart.findAll({where: {UserId, status: "waiting for payment"}}, {transaction: t})

      for await (let cart of carts){
        promises.push(
          await Food.findOne({where: {id: cart.FoodId}}, {transaction: t})
            .then((food)=>{
              let calculatedStock = +food.stock - +cart.quantity
              if (calculatedStock < 0){
                let err = {
                  statusCode: 400,
                  message: "Not enough stock"
                }
                throw new Error(err)
              } else {
                Food.update({calculatedStock}, {where: {id: food.id}})
              }
            })
            .catch(error => next(error))
        )
      }

      await Promise.all(promises)
      await t.commit()
    } catch (error) {
      await t.rollback()
      next(error)
    }
  }
}

module.exports = CartController