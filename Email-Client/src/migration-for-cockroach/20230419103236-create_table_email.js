"use strict";
const { Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.sequelize.query(`
    CREATE TABLE message (
      id uuid NOT NULL DEFAULT gen_random_uuid(), 
      message_id VARCHAR NOT NULL, 
      text_Body VARCHAR(100000000) NULL,
      Html_body VARCHAR(100000000) NULL,
      subject VARCHAR(100000) NULL,
      snippet VARCHAR(100000) NULL,
      user_id uuid NOT NULL,
      internet_message_id VARCHAR NULL,
      thread_id VARCHAR(1000) NOT NULL,
      in_reply_to VARCHAR(3000) NULL,
      refrence VARCHAR(1000) NULL,
      created_at TIMESTAMPTZ NULL,
      updated_at TIMESTAMPTZ NULL,
      CONSTRAINT message_pkey PRIMARY KEY (id ASC),
    CONSTRAINT "message_userId_fkey" FOREIGN KEY ("user_id") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE INDEX "messages_Id_key" ("id" ASC)
 )`);
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("message");
  },
};
