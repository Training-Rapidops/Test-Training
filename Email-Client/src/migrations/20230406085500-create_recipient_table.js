"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recipient", {
      id: {
        type: Sequelize.INTEGER(30),
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      messageId: {
        type: Sequelize.INTEGER(30),
        allowNull: false,
        references: { model: "message", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      emailAddress: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("recipient");
  },
};
