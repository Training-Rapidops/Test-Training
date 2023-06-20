"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("emailFolderAssociation", {
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
      labelId: {
        type: Sequelize.INTEGER(30),
        allowNull: false,
        references: { model: "label", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("emailFolderAssociation");
  },
};
