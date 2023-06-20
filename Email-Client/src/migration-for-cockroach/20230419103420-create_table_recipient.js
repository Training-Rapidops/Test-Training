"use strict";
const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.sequelize.query(`CREATE TABLE recipient (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      message_id uuid NOT NULL,
      email_address VARCHAR(1000) NOT NULL,
      type VARCHAR NOT NULL,
      CONSTRAINT recipient_pkey PRIMARY KEY (id ASC),
      CONSTRAINT "recipient_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES message(id) ON DELETE CASCADE ON UPDATE CASCADE,
      UNIQUE INDEX recipient_id_key (id ASC)
  )`);
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("recipient");
  },
};
