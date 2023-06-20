"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("label", {
      id: {
        type: Sequelize.INTEGER(30),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      labelName: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER(30),
        references: { model: "user", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
        allowNull: false,
      },
      syncedFolderId: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("label");
  },
};
