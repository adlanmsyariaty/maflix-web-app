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
        name: "Action",
      },
      {
        name: "Drama",
      },
      {
        name: "Romance",
      },
      {
        name: "Adventure",
      },
      {
        name: "Sci-Fi",
      },
      {
        name: "Animation",
      },
      {
        name: "Thriller",
      },
      {
        name: "Comedy",
      },
      {
        name: "Fantasy",
      },
      {
        name: "Horror",
      },
      {
        name: "Anime",
      },
      {
        name: "Documentary",
      },
      {
        name: "Fighting",
      }
    ]
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Genres', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Genres', null, {})
  }
};
