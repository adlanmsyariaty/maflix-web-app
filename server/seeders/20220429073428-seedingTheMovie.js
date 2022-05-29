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
        title: "The Godfather",
        slug: "the-godfather",
        synopsis: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
        trailerUrl: "https://www.youtube.com/watch?v=UaVTIH8mujA&ab_channel=ParamountPictures",
        imgUrl: "https://www.themoviedb.org/t/p/original/wWJbBo5yjw22AIjE8isBFoiBI3S.jpg",
        rating: 7,
        authorId: 1,
      },
      {
        title: "Hellbound",
        slug: "hellboound",
        synopsis: "During a perilous 24-hour mission on the moon, spa… research facility steeped in classified secrets.",
        trailerUrl: "https://www.youtube.com/embed/UWfgm20-LTM",
        imgUrl: "https://image.tmdb.org/t/p/original/5NYdSAnDVIXePrSG2dznHdiibMk.jpg",
        rating: 8,
        authorId: 1,
      }
    ]
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Movies', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movies', null, {})
  }
};
