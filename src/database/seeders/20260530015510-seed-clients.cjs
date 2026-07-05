'use strict';

const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clients', [
      {
        id: randomUUID(),
        name: 'Client',
        base_url: 'http://localhost:5173',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Client',
        base_url: 'https://gestaoestagios-frontend.onrender.com',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clients', null, {});
  }
};
