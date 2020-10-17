const { Restaurant } = require("../models")

class RestaurantController {
  static async create(req, res, next){
    try{
      // const UserId = req.userData.id
      const UserId = 1 // for testing purposes
      const { name, address, image_url } = req.body
  
      const restaurant = await Restaurant.create({UserId, name, address, image_url})

      res.status(201).json({id: restaurant.id, name: restaurant.name, address: restaurant.address, image_url: restaurant.image_url})
    }catch(error){
      next(error)
    }
  }

  static async findAll(req, res, next){
    try {
      const { id } = req.params //restaurant id
      
      const restaurants = await Restaurant.findAll()

      res.status(200).json({restaurants})
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req, res, next){
    try {
      const { id } = req.params //restaurant id
      
      const restaurant = await Restaurant.findOne({where: {id}})

      if(!restaurant){
        let error = {
          statusCode: 404,
          message: "restaurant not found"
        }
        next(error)
      } else {
        res.status(200).json({id: restaurant.id, name: restaurant.name, address: restaurant.address, image_url: restaurant.image_url})
      }
    } catch (error) {
      next(error)
    }
  }
  static async update(req, res, next){
    try {
      const { id } = req.params //restaurant id
      const { name, address, image_url } = req.body
      
      const data = await Restaurant.update({name, address, image_url}, {where: {id}, returning: true})
      const restaurant = data[1][0].dataValues
      res.status(200).json({id: restaurant.id, name: restaurant.name, address: restaurant.address, image_url: restaurant.image_url})
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next){
    try {
      const { id } = req.params //restaurant id

      const restaurant = await Restaurant.destroy({where: {id}, returning: true})

    res.status(200).json({restaurant})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RestaurantController