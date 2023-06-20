"use strict";

const { Sequelize, fn } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("roles_permission_table", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: fn("gen_random_uuid"),
      },
      role: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: false,
      },
      permission: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      is_master: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("roles_permission_table");
  },
};
