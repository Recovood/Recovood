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
      //SERPONG
      {
        name: "Laksa",
        image_url: "https://sumbarfokus.com/foto_berita/87laksa-betawi_yang_menggugah_selera.jpg",
        price: 25000,
        stock: 3,
        ingredient: "Laksa is a spicy noodle soup popular in the Peranakan cuisine of Southeast Asia ",
        RestaurantId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nasi Timbel",
        image_url: "https://img.qraved.co/v2/image/data/2015/08/19/de_leuit-590x590-x.jpg",
        price: 30000,
        stock: 2,
        ingredient: "Hot steamed rice wrapped in banana leaf surrounded with side dishes",
        RestaurantId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Steak",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/06/5c/1b/12/getlstd-property-photo.jpg",
        price: 100000,
        stock: 1,
        ingredient: "A steak is a meat generally sliced across the muscle fibers, potentially including a bone.",
        RestaurantId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Hotdog",
        image_url: "https://www.nibble.id/blog/wp-content/uploads/2017/05/hotdog-di-jakarta-05.jpg",
        price: 50000,
        stock: 3,
        ingredient: "A hot dog is a grilled or steamed food where a sausage is served in the slit of a partially sliced bun. The sausage used is the wiener or frankfurter.",
        RestaurantId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bakmi Babi",
        image_url: "https://assets-pergikuliner.com/MZPY37pP_CN6iNWiAtAG-lOPBWM=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/123194/picture-1448597947.JPG",
        price: 40000,
        stock: 4,
        ingredient: "noodle with pork",
        RestaurantId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //CILANDAK
      {
        name: "Spaghetti Aglio e Olio",
        image_url: "https://assets-pergikuliner.com/nAXfnWMoxRKJL-XU_NDEyf4vKr0=/312x0/smart/https://assets-pergikuliner.com/uploads/image/picture/2006741/picture-1598575860.jpg",
        price: 35000,
        stock: 5,
        ingredient: "The dish is made by lightly sauteeing sliced, minced, or pressed garlic in olive oil, sometimes with the addition of dried red chili flakes, and tossing with spaghetti.",
        RestaurantId: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sushi",
        image_url: "https://ik.imagekit.io/tvlk/cul-asset/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/tvlk-prod-cul-assets/culinary/asset/REST_752-720x720-FIT_AND_TRIM-c07b73f2028603b5b3bf17c9594655a5.jpeg?tr=q-40,c-at_max,w-1080,h-1920&_src=imagekit",
        price: 50000,
        stock: 4,
        ingredient: "Sushi is a popular Japanese dish made from seasoned rice with fish, egg, or vegetables.",
        RestaurantId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Fish and chips",
        image_url: "https://assets-pergikuliner.com/_bkfFBLhg7G6oRwVnOIdcwkgxek=/385x290/smart/https://assets-pergikuliner.com/uploads/image/picture/1488402/picture-1563187403.jpg",
        price: 30000,
        stock: 2,
        ingredient: "Fish and chips is a hot dish consisting of fried fish in batter served with chips.",
        RestaurantId: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Fried Crispy Duck",
        image_url: "https://b.zmtcdn.com/data/pictures/9/18836759/0e7b8c093e847050cbe76bb7315100c9_featured_v2.jpg",
        price: 30000,
        stock: 5,
        ingredient: "Fried duck with sambal matah",
        RestaurantId: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bratwurst",
        image_url: "https://node-img.qraved.com/image/data/2015/10/05/imbiss-640x640.jpg",
        price: 70000,
        stock: 2,
        ingredient: "German sausage made from veal, beef, or most commonly pork.",
        RestaurantId: 20,
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
