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
    await queryInterface.bulkInsert("Restaurants", [
      // DENPASAR
      {
        name: "Fukudako Japanese Restaurant",
        address: "Jalan Kepaon Indah swung No.2X, Pemogan, Denpasar Selatan, Pemogan, Kec. Denpasar Sel., Kota Denpasar, Bali 80221",
        image_url: "https://lh5.googleusercontent.com/p/AF1QipM-Xni2o9-5ymEOWfMGFPnael-GraP7Ou5CKOvO=w408-h306-k-no",
        longitude: -8.709444,
        latitude: 115.199977,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Warung Tabia Bali",
        address: "Jl. Mekar I No.41 Kepaon selatan, Pemogan, Denpasar Selatan, Denpasar City, Bali 80221",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwSwvIuJRTV5r4N_Xe0XDO5ke4WwVedPYprA&usqp=CAU",
        longitude: -8.709611,
        latitude: 115.203616,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nandiya Bakery",
        address: "Jl. Tukad Baru Timur, Pemogan, Kec. Denpasar Sel., Kota Denpasar, Bali 80221",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/80/ee/00/conato-bakery.jpg",
        longitude: -8.692270, 
        latitude: 115.197484,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gabah Indonesian Cuisine",
        address: "Jalan Bakung Sari, Kuta, Kabupaten Badung, Bali 80361",
        image_url: "https://m.justgola.com/media/a/00/11/71548_lg_1.jpeg",
        longitude: -8.723862,
        latitude: 115.171552,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ristorante Il Tempio Bali",
        address: "Jalan Dewi Sartika, Tuban, Kuta, Kabupaten Badung, Bali 80361",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRK0gy70M2qJhdARWpFIeSX9o66-HpfAdggag&usqp=CAU",
        longitude: -8.727120,
        latitude: 115.169696,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // CILEDUG
      {
        name: "Kayu Kayu Restaurant",
        address: "Jl. Jalur Sutera No.Kav. 28A, Pakualam, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15325",
        image_url: "https://pingpoint.co.id/media/images/Kayu_Kayu_Restaurant_Sajikan_Menu_Khas_Indonesi.original.jpg",
        longitude: -6.231827,
        latitude: 106.659953,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Holycow! Steakhouse by Chef Afit",
        address: "Kompleks Ruko The Element No.B-18, Jl. Jalur Sutera 25 BC, Pakualam, Tangerang, RT.002/RW.006, Pakualam, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15143",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSisthqAnxsH-i3y-8oEtmYARp7PkQeDgXrVQ&usqp=CAU",
        longitude: -6.231038,
        latitude: 106.659116,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Kochhaus Cafe, Shop & Studio",
        address: "Jl. Jalur Sutera, Ruko Dynasti Walk 29B No. 5, Alam Sutra, East Panunggangan, Pinang, Tangerang City, Banten 15143",
        image_url: "https://assets-pergikuliner.com/ZmmALjf5gf4k6ZPZ3fTSqaf6O28=/385x290/smart/https://assets-pergikuliner.com/uploads/image/picture/1212438/picture-1546915271.jpg",
        longitude: -6.233519, 
        latitude: 106.659794,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Oh My Taco",
        address: "Ruko Graha Boulevard blok D/16, Jalan Raya Boulevard, Gading Serpong, Curug Sangereng, Kec. Klp. Dua, Tangerang, Banten 15810",
        image_url: "https://b.zmtcdn.com/data/pictures/9/18836759/0e7b8c093e847050cbe76bb7315100c9_featured_v2.jpg",
        longitude: -6.250946,
        latitude: 106.626013,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "martabak san francisco gading serpong",
        address: "Ruko Glaze 1, Blok M5, Jl. Boulevard Raya Gading Serpong No.28A, Curug Sangereng, Kec. Klp. Dua, Tangerang, Banten 15810",
        image_url: "https://www.nibble.id/blog/wp-content/uploads/2018/07/martabak-di-serpong-02.jpg",
        longitude: -6.249236,
        latitude: 106.626116,
        UserId: 1,
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
    await queryInterface.bulkDelete("Restaurants", null, {});
  }
};
