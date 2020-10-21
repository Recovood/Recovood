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
        address: "Jalan Kepaon Indah Suwung",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/11/be/a3/0e/photo-suminato.jpg",
        latitude: -8.709444,
        longitude: 115.199977,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Warung Tabia Bali",
        address: "Jl. Mekar I No.41 Kepaon selatan",
        image_url: "https://cdn.water-sport-bali.com/wp-content/uploads/2014/09/Fair-Warung-Bale-Restaurant-Ubud.jpg",
        latitude: -8.709611,
        longitude: 115.203616,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nandiya Bakery",
        address: "Jl. Tukad Baru Timur, Pemogan",
        image_url: "https://i.pinimg.com/originals/44/fa/b7/44fab70348c532174bf51070ec9fbd25.jpg",
        latitude: -8.692270,
        longitude: 115.197484,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gabah Indonesian Cuisine",
        address: "Jalan Bakung Sari, Kuta",
        image_url: "https://foodciousenglish.files.wordpress.com/2013/10/signage1.jpg",
        latitude: -8.723862,
        longitude: 115.171552,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ristorante Il Tempio Bali",
        address: "Jalan Dewi Sartika, Kuta",
        image_url: "https://s3-ap-southeast-1.amazonaws.com/s3.kura2guide.com/SpotImage/6226/image/1.jpg",
        latitude: -8.727120,
        longitude: 115.169696,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // CILEDUG
      {
        name: "Kayu Kayu Restaurant",
        address: "Jl. Jalur Sutera Serpong",
        image_url: "https://images.adsttc.com/media/images/5cd5/009b/284d/d1ab/e000/04fa/medium_jpg/WIL_5865.jpg?1557463143",
        latitude: -6.231827,
        longitude: 106.659953,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Holycow! Steakhouse by Chef Afit",
        address: "Kompleks Ruko The Element",
        image_url: "https://pbs.twimg.com/media/CMbBXKeVAAATyeI.jpg:large",
        latitude: -6.231038,
        longitude: 106.659116,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Kochhaus Cafe, Shop & Studio",
        address: "Ruko Dynasti Walk 29B No. 5",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxLKNKgURx1mw3Sjykxcd7KZ9tBiA_vdtcag&usqp=CAU",
        latitude: -6.233519,
        longitude: 106.659794,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Oh My Taco",
        address: "Ruko Graha Boulevard",
        image_url: "https://b.zmtcdn.com/data/menus/759/18836759/804efacf3e4f52264fbf1e0f1c636da2.jpg",
        latitude: -6.250946,
        longitude: 106.626013,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "martabak san francisco gading serpong",
        address: "Ruko Glaze 1, Blok M5",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRaV_7a92KtQjZyJiyXhU475uvsnB2pGTLXjA&usqp=CAU",
        latitude: -6.249236,
        longitude: 106.626116,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // SERPONG
      {
        name: "Laksa khas Serpong",
        address: "Jl. Rawa Buntu Selatan",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShdo--Qii0Ots4hOO1VOKQX5LNKYVW2YgN9w&usqp=CAU",
        latitude: -6.279893,
        longitude: 106.839151,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sari Boboko Sundanese Seafood & Manadonese Food",
        address: "BSD City, Tangerang Selatan",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQh1quIP8E2iA991V41DK5IUs_P8joLlq5-XQ&usqp=CAU",
        latitude: -6.314280,
        longitude: 106.703670,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Steak Hotel by Holycow! TKP BSD",
        address: "BSD City, Ruko Bidex",
        image_url: "https://pbs.twimg.com/media/CMbBXKeVAAATyeI.jpg:large",
        latitude: -6.297730,
        longitude: 106.688500,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "The Docks",
        address: "BSD Green Office Park",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUtEwrZ_xjiWyyljus6rHlpvKWLI9ThEgBcw&usqp=CAU",
        latitude: -6.299060,
        longitude: 106.672260,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bakmi Tiong Sim Asli Medan",
        address: "Jl. Nn No.5, Lengkong Karya",
        image_url: "https://ik.imagekit.io/tvlk/cul-asset/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/tvlk-prod-cul-assets/culinary/asset/REST_201-1023x720-FIT_AND_TRIM-cba7eca64599755d0e5dac3b5b1bbfd3.jpeg?tr=q-40,w-300,h-300&amp;_src=imagekit",
        latitude: -6.248754,
        longitude: 106.649351,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //CILANDAK
      {
        name: "Rumanami Residence",
        address: "Jl. Benda Jl. H. Sainin",
        image_url: "https://cf.bstatic.com/images/hotel/max1280x900/255/255386915.jpg",
        latitude: -6.275045,
        longitude: 106.816801,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "otw sushi jakarta Cilandak",
        address: "Jl. Caringin Utara",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTM-EeM9FKr5nYhvNoyW4kEPWC7iL3_g98RKg&usqp=CAU",
        latitude: -6.283037,
        longitude: 106.792655,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Fish & Co",
        address: "Jl. RS. Fatmawati Raya",
        image_url: "https://ecs7.tokopedia.net/img/banner/2018/12/14/2892668/2892668_4998c6dc-5539-4d6a-946f-14ef09f9c857.png",
        latitude: -6.291026,
        longitude: 106.795134,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bebek Tepi Sawah",
        address: "Cilandak Town Square",
        image_url: "https://metropekanbaru.com/wp-content/uploads/2019/04/Bebek-tepi-sawah-resto-depan-780x405.jpg",
        latitude: -6.291443,
        longitude: 106.799693,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Imbiss Stube",
        address: "Cilandak Town Square",
        image_url: "https://s3.ap-southeast-2.amazonaws.com/indonesia.travlr.com/uploads/images/venue/fa8b2a680b7e9eef45c9ccabc4edef0d.jpg?v=1",
        latitude: -6.291443,
        longitude: 106.799693,
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
