"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("message", [
      {
        textBody: "This Is text Body 1",
        HtmlBody: "<h1>Hello world</h1>",
        subject: "This is Subject 1",
        snippet: "Snippet is Here",
        userId: 2,
        threadID: 1213456,
        isRead: true,
        inReplyTo: "reply message id will be here",
        refrence: "multiple user mails will be here to track refrence",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBody: "This Is text Body 2",
        HtmlBody: "<h1>Hello universe</h1>",
        subject: "This is Subject 2",
        snippet: "Snippet is Here",
        userId: 1,
        threadID: 12456,
        isRead: true,
        inReplyTo: "reply message id will be here",
        refrence: "multiple user mails will be here to track refrence",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("message", [{ userId: 2, userId: 1 }]);
  },
};
