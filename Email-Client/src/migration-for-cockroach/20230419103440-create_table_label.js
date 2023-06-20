"use strict";
const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.sequelize.query(` CREATE TABLE label (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      label_name VARCHAR(3000) NOT NULL,
      user_id uuid NOT NULL,
      synced_folder_id VARCHAR(300) NOT NULL,
      priority INTEGER NOT NULL,
      fetched BOOL NOT NULL DEFAULT FALSE,
      next_page_token VARCHAR NULL,
      CONSTRAINT label_pkey PRIMARY KEY (id ASC),
      CONSTRAINT "label_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
      UNIQUE INDEX label_id_key (id ASC)
  )`);
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("label");
  },
};
