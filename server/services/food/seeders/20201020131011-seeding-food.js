'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Food", [
      // DENPASAR
      {
        name: "Udon",
        image_url: "https://lh5.googleusercontent.com/p/AF1QipM-Xni2o9-5ymEOWfMGFPnael-GraP7Ou5CKOvO=w408-h306-k-no",
        price: 10000,
        stock: 10,
        ingredient: "Udon is a type of thick, wheat-flour noodle used frequently in Japanese cuisine. It is often served hot as a noodle soup in its simplest form.",
        RestaurantId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nasi Lawar",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwSwvIuJRTV5r4N_Xe0XDO5ke4WwVedPYprA&usqp=CAU",
        price: 8000,
        stock: 8,
        ingredient: "Lawar adalah masakan berupa campuran sayur-sayuran dan daging cincang yang dibumbui secara merata yang berasal dari Bali",
        RestaurantId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Brownies",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/80/ee/00/conato-bakery.jpg",
        price: 5000,
        stock: 5,
        ingredient: "A chocolate brownie or simply a brownie is a square or rectangular chocolate baked confection.",
        RestaurantId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Kerang Saus Kuning",
        image_url: "https://m.justgola.com/media/a/00/11/71548_lg_1.jpeg",
        price: 20000,
        stock: 5,
        ingredient: "Kerang yang dilumuri bumu kuning spesial khas rempah Indonesia.",
        RestaurantId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pizza",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRK0gy70M2qJhdARWpFIeSX9o66-HpfAdggag&usqp=CAU",
        price: 15000,
        stock: 3,
        ingredient: "a dish of Italian origin consisting of a flat, round base of dough baked with a topping of tomato sauce and cheese, typically with added meat or vegetables.",
        RestaurantId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // CILEDUG
      {
        name: "Sate Padang",
        image_url: "https://pingpoint.co.id/media/images/Kayu_Kayu_Restaurant_Sajikan_Menu_Khas_Indonesi.original.jpg",
        price: 6000,
        stock: 10,
        ingredient: "Sate padang is a speciality satay from Minangkabau cuisine, made from beef cut into small cubes with spicy sauce on top. ",
        RestaurantId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Steak",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSisthqAnxsH-i3y-8oEtmYARp7PkQeDgXrVQ&usqp=CAU",
        price: 30000,
        stock: 4,
        ingredient: "Sushi is a popular Japanese dish made from seasoned rice with fish, egg, or vegetables.",
        RestaurantId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Black Cofee",
        image_url: "https://assets-pergikuliner.com/ZmmALjf5gf4k6ZPZ3fTSqaf6O28=/385x290/smart/https://assets-pergikuliner.com/uploads/image/picture/1212438/picture-1546915271.jpg",
        price: 3000,
        stock: 2,
        ingredient: "Black coffee is simply coffee that is normally brewed without the addition of additives such as sugar, milk, cream or added flavours.",
        RestaurantId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tacos",
        image_url: "https://b.zmtcdn.com/data/pictures/9/18836759/0e7b8c093e847050cbe76bb7315100c9_featured_v2.jpg",
        price: 5000,
        stock: 5,
        ingredient: "a Mexican dish consisting of a fried tortilla, typically folded, filled with various mixtures, such as seasoned meat, beans, lettuce, and tomatoes.",
        RestaurantId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Martabak Manis",
        image_url: "https://www.nibble.id/blog/wp-content/uploads/2018/07/martabak-di-serpong-02.jpg",
        price: 10000,
        stock: 5,
        ingredient: "Kue terang bulan adalah kudapan sejenis panekuk yang biasa dijajakan di pinggir jalan di seluruh Indonesia.",
        RestaurantId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Food", null, {});
  }
};
