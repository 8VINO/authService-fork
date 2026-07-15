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
        id: '884af13e-ea83-44d6-ab0d-26d8f41f249a',
        name: 'Gestão de Estágios',
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
