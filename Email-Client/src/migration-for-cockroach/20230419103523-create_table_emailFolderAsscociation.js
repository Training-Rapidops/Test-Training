"use strict";
const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.sequelize.query(`
      CREATE TABLE email_folder_Association (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
       message_id uuid NOT NULL,
       label_id uuid NOT NULL,
       CONSTRAINT email_folder_association_pkey PRIMARY KEY (id ASC),
       CONSTRAINT email_folder_association_message_id_fkey FOREIGN KEY ("message_id") REFERENCES message(id) ON DELETE CASCADE ON UPDATE CASCADE,
       CONSTRAINT email_folder_association_label_id_fkey FOREIGN KEY ("label_id") REFERENCES label(id) ON DELETE CASCADE ON UPDATE CASCADE

   )

`);
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("email_folder_association");
  },
};
