"use strict";

const { Sequelize, fn } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("user_role_association_table", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: fn("gen_random_uuid"),
      },
      role_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: "roles_permission_table", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      employee_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: "employee_table", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("user_role_association_table");
  },
};
