"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("message", {
      id: {
        type: Sequelize.INTEGER(30),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      textBody: {
        type: Sequelize.STRING(5000),
      },
      HtmlBody: {
        type: Sequelize.STRING(5000),
      },
      subject: {
        type: Sequelize.STRING(2000),
      },
      snippet: {
        type: Sequelize.STRING(3000),
      },
      userId: {
        type: Sequelize.INTEGER(11),
        references: { model: "user", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
        allowNull: false,
        defaultValue: 1,
      },
      threadID: {
        type: Sequelize.INTEGER(30),
        allowNull: false,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      inReplyTo: {
        type: Sequelize.STRING(30),
      },
      refrence: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("message");
  },
};
