'use strict';

/** @type {import('sequelize-cli').Migration} */
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

    await queryInterface.bulkInsert('Users',[
      {
        email : 'admin@gmail.com',
        gender : 'Female',
        password : 'admin',
        role : 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email : 'admin2@gmail.com',
        gender : 'Male',
        password : 'admin2',
        role : 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
