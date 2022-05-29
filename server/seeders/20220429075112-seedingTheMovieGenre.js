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
        movieId: 2,
        genreId: 8,
      },
      {
        movieId: 2,
        genreId: 1,
      },
      {
        movieId: 2,
        genreId: 4,
      },
      {
        movieId: 2,
        genreId: 10,
      },
      {
        movieId: 2,
        genreId: 11,
      },
      {
        movieId: 1,
        genreId: 1,
      },
      {
        movieId: 1,
        genreId: 4,
      },
    ]
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('MovieGenres', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MovieGenres', null, {})
  }
};
