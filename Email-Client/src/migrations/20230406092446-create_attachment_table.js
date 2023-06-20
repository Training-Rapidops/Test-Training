"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("attachment", {
      id: {
        type: Sequelize.INTEGER(30),
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
      fileName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      filePath: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      fileType: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      fileSize: {
        type: Sequelize.INTEGER(255),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("attachment");
  },
};
