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
        castId: 3,
        id: 26
      },
      {
        movieId: 2,
        castId: 4,
        id: 27
      },
      {
        movieId: 2,
        castId: 5,
        id: 28
      },
      {
        movieId: 1,
        castId: 1,
        id: 105
      },
      {
        movieId: 1,
        castId: 2,
        id: 106
      },
    ]
    data.forEach(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('MovieCasts', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Casts', null, {})
  }
};
