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
        address: "Jalan Kepaon Indah No.2X, Denpasar Selatan, Bali 80221",
        image_url: "https://lh5.googleusercontent.com/p/AF1QipM-Xni2o9-5ymEOWfMGFPnael-GraP7Ou5CKOvO=w408-h306-k-no",
        longitude: -8.709444,
        latitude: 115.199977,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Warung Tabia Bali",
        address: "Jl. Mekar I No.41 Kepaon Selatan, Denpasar Selatan, Bali 80221",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwSwvIuJRTV5r4N_Xe0XDO5ke4WwVedPYprA&usqp=CAU",
        longitude: -8.709611,
        latitude: 115.203616,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nandiya Bakery",
        address: "Jl. Tukad Baru Timur, Denpasar Selatan, Bali 80221",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/80/ee/00/conato-bakery.jpg",
        longitude: -8.692270,
        latitude: 115.197484,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gabah Indonesian Cuisine",
        address: "Jl. Bakung Sari, Kuta, Kabupaten Badung, Bali 80361",
        image_url: "https://m.justgola.com/media/a/00/11/71548_lg_1.jpeg",
        longitude: -8.723862,
        latitude: 115.171552,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ristorante Il Tempio Bali",
        address: "Jl. Dewi Sartika, Tuban, Kuta, Kabupaten Badung, Bali 80361",
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
      // SERPONG
      {
        name: "Laksa khas Serpong",
        address: "Jl. Rawa Buntu Selatan No.7, Serpong, Banten 15310",
        image_url: "https://sumbarfokus.com/foto_berita/87laksa-betawi_yang_menggugah_selera.jpg",
        longitude: -6.279893,
        latitude: 106.839151,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sari Boboko Sundanese Seafood & Manadonese Food",
        address: "BSD City, Jl. Ciater Bar. No.54, Banten 15310",
        image_url: "https://img.qraved.co/v2/image/data/2015/08/19/de_leuit-590x590-x.jpg",
        longitude: -6.314280,
        latitude: 106.703670,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Steak Hotel by Holycow! TKP BSD",
        address: "BSD City, Ruko Bidex 2B No. 2, Jl. Pahlawan Seribu, Lengkong Gudang, Kec. Serpong, Kota Tangerang Selatan, Banten 15321",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/06/5c/1b/12/getlstd-property-photo.jpg",
        longitude: -6.297730,
        latitude: 106.688500,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "The Docks",
        address: "BSD Green Office Park, Jl. BSD Grand Boulevard, Sampora, BSD, Tangerang, Banten 15345",
        image_url: "https://www.nibble.id/blog/wp-content/uploads/2017/05/hotdog-di-jakarta-05.jpg",
        longitude: -6.299060,
        latitude: 106.672260,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bakmi Tiong Sim Asli Medan",
        address: "Jl. Nn No.5, Lengkong Karya, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15310",
        image_url: "https://assets-pergikuliner.com/MZPY37pP_CN6iNWiAtAG-lOPBWM=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/123194/picture-1448597947.JPG",
        longitude: -6.248754,
        latitude: 106.649351,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //CILANDAK
      {
        name: "Rumanami Residence",
        address: "Jl. H. Sainin No.39, Kemang, Kec. Ps. Minggu, Jakarta Selatan 12560",
        image_url: "https://assets-pergikuliner.com/9pVuLAzrH-cjRJcHSGLUhGiKZ1c=/385x290/smart/https://assets-pergikuliner.com/uploads/image/picture/1975441/picture-1595501431.jpg",
        longitude: -6.275045,
        latitude: 106.816801,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "otw sushi jakarta Cilandak",
        address: "Jl. Caringin Utara No.38, Cilandak Barat, Jakarta Selatan 12430",
        image_url: "https://ik.imagekit.io/tvlk/cul-asset/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/tvlk-prod-cul-assets/culinary/asset/REST_752-720x720-FIT_AND_TRIM-c07b73f2028603b5b3bf17c9594655a5.jpeg?tr=q-40,c-at_max,w-1080,h-1920&_src=imagekit",
        longitude: -6.283037,
        latitude: 106.792655,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Fish & Co",
        address: "Jl. RS. Fatmawati Raya No.140-142, Cilandak Barat, Jakarta Selatan 12430",
        image_url: "https://assets-pergikuliner.com/_bkfFBLhg7G6oRwVnOIdcwkgxek=/385x290/smart/https://assets-pergikuliner.com/uploads/image/picture/1488402/picture-1563187403.jpg",
        longitude: -6.291026,
        latitude: 106.795134,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bebek Tepi Sawah",
        address: "Cilandak Town Square Ground Floor Unit 073, Cilandak Barat, Jakarta Selatan 12430",
        image_url: "https://assets-pergikuliner.com/9yL3QGGaacAUORPfpLE9pgSfM08=/385x290/smart/https://assets-pergikuliner.com/uploads/image/picture/1211230/picture-1546836385.JPG",
        longitude: -6.291443,
        latitude: 106.799693,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Imbiss Stube",
        address: "Cilandak Town Square Lt GF Unit C 033 Kav 17, Cilandak Barat, Jakarta Selatan 12430",
        image_url: "https://node-img.qraved.com/image/data/2015/10/05/imbiss-640x640.jpg",
        longitude: -6.291443,
        latitude: 106.799693,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    )
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
