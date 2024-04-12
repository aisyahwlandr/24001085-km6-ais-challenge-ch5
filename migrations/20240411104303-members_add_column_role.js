'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("members", "role", {
      type: Sequelize.ENUM("member", "admin", "superadmin"),
      allowNull: false,
      defaultValue: "member",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("members", "role");
  },
};
