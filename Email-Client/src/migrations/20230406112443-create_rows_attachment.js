"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("attachment", [
      {
        messageId: 1,
        fileName: "AttachmentFile1.js",
        filePath: "/home/Desktop/AttachmentFile1.js",
        fileType: "JavaScript",
        fileSize: "3000",
      },
      {
        messageId: 1,
        fileName: "AttachmentFile2.pdf",
        filePath: "/home/Desktop/Downloads/AttachmentFile1.js",
        fileType: "PDF",
        fileSize: "10000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("attachment", [
      { fileName: "AttachmentFile1.js", fileName: "AttachmentFile2.pdf" },
    ]);
  },
};
