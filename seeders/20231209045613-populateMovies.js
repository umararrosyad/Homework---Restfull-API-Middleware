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

    await queryInterface.bulkInsert('Movies', [
      {
        title : 'Reckless',
        genres : 'Comedy|Drama|Romance',
        year : '2001',    
        createdAt: new Date(),
        updatedAt: new Date()    
      },
      {
        title : 'When a Man Loves a Woman',
        genres : 'Drama|Romance',
        year : '1995',
        createdAt: new Date(),
        updatedAt: new Date()  
      },
      {
        title : 'Gang Related',
        genres : 'Crime',
        year : '1993',
        createdAt: new Date(),
        updatedAt: new Date()  
      },

    ] )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Movies',null,{})
  }
};
