'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [
      {
        id: 1,
        name: "Al Pacino",
        profilePict: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQCHMkHfRANVVgjQ7cTIzazWpvRtTLcO6f5u_LBzck_5VLpALSl"
      },
      {
        id: 2,
        name: "Marlon Brandon",
        profilePict: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRcft2nemmiOeIlZzg01QDxOH1Axa1F51ORAQGS_QwpiPHc5xMo7wftL4itMOAy"
      },
      {
        id: 3,
        name: "Yoo Ah In",
        profilePict: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQZjXVkw4IbnpciRHoZXk3_Aw5SlisTP7hvqOQyrFeCOsptjKuu"
      },
      {
        id: 4,
        name: "Kim Hyun-joo",
        profilePict: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQM_8PCEqpHwGdphYRJVCaBRpMANCKr8WLpkPP4c55rp9TFuv8C"
      },
      {
        id: 5,
        name: "Park Jeong-min",
        profilePict: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ2MX_XlauKOw2RmgPs0-KY1G4btX9_Pp5vu7-vO0ehe7yZwzpcQBsOvjiyGBil"
      },
      {
        id: 6,
        name: "Finn Wolfhard",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxD3__-rQoG_g-YpdKDeMCw_-beOQTQc5ag3K37zMYpJ2avEI-"
      },
      {
        id: 7,
        name: "Millie Bobby Brown",
        profilePict: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcTthWWB-nFFOy5hY6vMBimvzQFLZ7HfvSB4MlMdQ3Nxalj-RmW5ubXLZsg6-jIZ"
      },
      {
        id: 8,
        name: "Noah Schnapp",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROk5iJ4PyKPxcE9iVG6TILhcJTMN8gD_t_yS4szEfyWXQHxq3P"
      },
      {
        name: "Johnny Depp",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStpy5AJ7T5ogRTjgXmakPRf0SaxtG5fA-7YtfI7aqZKjBCSi7R",
        id: 9
      },
      {
        name: "Regé-Jean Page",
        profilePict: "https://cdn-image.hipwee.com/wp-content/uploads/2021/01/hipwee-rs_1200x1200-210106093439-1200-Rege-Jean_Page-BAFTAs_Pre_Party2020-gj-640x640.jpg",
        id: 10
      },
      {
        name: "Phoebe Dynevor",
        profilePict: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTV6jmkXanOslba7aL2iy90XjpyApWHGpXXVoeOrhjRMdT24FL-",
        id: 11
      },
      {
        name: "Park Solomon",
        profilePict: "https://cdn0-production-images-kly.akamaized.net/O93QbLGis0cuAE4nVPz2wFwt-Ao=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3917841/original/074177900_1643365931-1.jpg",
        id: 12
      },
      {
        name: "Cho Yi-hyun",
        profilePict: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQTA6N_mieELJuuJeFJo-Dpf25nn8kDf54MzRvql_zq5msxApVq",
        id: 13
      },
      {
        name: "Yoon Chan-young",
        profilePict: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQky56mRIh4jsAYUFhG2FZD86dLjCwt5Qxi4-bizAlL081iKWe08588_-rOKE4E",
        id: 14
      },
      {
        name: "Park Ji-hoo",
        profilePict: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSsvSLeJUkzRY_udeK0HcL2eF04g9Vtm5mfPDv9vHmY5LJNktdM3diAxDb4XIgS",
        id: 15
      },
      {
        name: "Gong Yoo",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi3t5opqOWaKYJa73zUSPgrumBS_8hK4LhTQsHXYxgnRlMVsnY",
        id: 16
      },
      {
        name: "Bae Doona",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoumFv0hhaxogHWzxNuGCTXw3jgH8G91C6c4hRpWhBW-1xAXrZ",
        id: 17
      },
      {
        name: "Kim Si-a",
        profilePict: "https://asianwiki.com/images/7/78/Kim_Shi-A-2008-p1.jpg",
        id: 18
      },
      {
        name: "Lee Joon",
        profilePict: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRm_Zd9o_Ybg13ngWXggEUDQDAGMaavmdsyak1i6vB0zYSyApFzLe1M1sxVdW68",
        id: 19
      },
      {
        name: "Lee Moo Saeng",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1b2QGlZJ6g6_X_W2fBQ32B9Htettw44BYABfahpCpZq6ab9Tl",
        id: 20
      },
      {
        name: "Ralph Macchio",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5xxyYDZ_VvQRWPoBo4W6ftr7a9nfbgCry5ytMRhz6iiTYRuN0",
        id: 21
      },
      {
        name: "Jacob Bertrand",
        profilePict: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ6o3rjsASdn_5N3Tv4dxHqz5xE9HoRj_fNLYxXwieIb487IBtv",
        id: 22
      },
      {
        name: "Álvaro Morte",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTgjiPg9dXGN1cu_BZE0i8bFY_pwkk-N4ZzgDLBDjJrC6w1C_",
        id: 23
      },
      {
        name: "Úrsula Corberó",
        profilePict: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTV_IdsV5Oel7GhWGs-MfJNhsh1RsKOtwkxrK4csIjuFjAhTLGK",
        id: 24
      },
      {
        name: "Itziar Ituño",
        profilePict: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQFmHTCLXriJS5UZbExjGCAk-O4tjHWV-AhsUwyf5IMh1b1tkoY5BvzD9YfNTUS",
        id: 25
      },
      {
        name: "Pedro Alonso",
        profilePict: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTdxUO8fb8idHHW4dHfPa2cc76UaKJ3yA0ojiqmAAfUoZB5rPp6",
        id: 26
      },
      {
        name: "Jaime Lorente",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThZWJx32e7vvzK-_Ok8rl2M6ZtEKhiHz9-uAAJcMVwAKPabKAJ",
        id: 27
      },
      {
        name: "Benedict Cumberbatch",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe20WzHzT8bz29yR7iy9h9y3RdG7zskA3P--HS-kM_ClV9TSrF",
        id: 28
      },
      {
        name: "Xochitl Gomez",
        profilePict: "https://s3-eu-west-1.amazonaws.com/static.screenweek.it/artist/54060.jpg?1640598157",
        id: 29
      },
      {
        name: "Elizabeth Olsen",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToxe6GXA-WEjTWfhTyhfF01t58caLp__PmJanZ0yUZ7Z9Rkdbg",
        id: 30
      },
      {
        name: "Jude Law",
        profilePict: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ2YFw-xi0GeDR2P8LqtrrLLTqtOkeS545IITdvLdSg22UIOzlp",
        id: 31
      },
      {
        name: "Mads Mikkelsen",
        profilePict: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRE0dvBlosNyQ_rQACxZHS9gvrUHzbK-jiB-b2oBWuXyub1VqJY",
        id: 32
      },
      {
        name: "Eddie Redmayne",
        profilePict: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4NXuqiCSJrp6Y53Ux4DdAo7NhS-jJx30TKu4dS5xL4Ymtx2SG",
        id: 33
      },
      {
        name: "Ezra Miller",
        profilePict: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcT9tUboaAgNE_7SlbDex8ACaZif-Lul5iz4JIgOWmc0y_Kd9InA9Dxn197vUpPW",
        id: 34
      },
      {
        name: "Ester Expósito",
        profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx0lxJahZK5ItppeWqOwpA25pR_SjEUa25vi4LuTWOo2lz_fyU",
        id: 35
      }
    ]
    data.forEach(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Casts', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MovieCasts', null, {})
  }
};
