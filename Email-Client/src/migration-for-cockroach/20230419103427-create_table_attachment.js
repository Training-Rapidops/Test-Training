"use strict";
const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.sequelize.query(`CREATE TABLE attachment (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      message_id uuid NOT NULL,
      attachment_id VARCHAR(10000) NOT NULL,
      file_name VARCHAR NOT NULL,
      file_path VARCHAR(1000) NULL,
      file_type VARCHAR NOT NULL,
      file_size VARCHAR NOT NULL,
      CONSTRAINT attachment_pkey PRIMARY KEY (id ASC),
      CONSTRAINT "attachment_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES message(id) ON DELETE CASCADE ON UPDATE CASCADE,
      UNIQUE INDEX attachment_id_key (id ASC)
  )`);
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("attachment");
  },
};
