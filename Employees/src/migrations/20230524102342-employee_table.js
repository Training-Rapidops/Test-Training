"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    // const { Sequelize } = require("sequelize");
    await queryInterface.sequelize.query(
      `CREATE TABLE employee_table(
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      employee_name VARCHAR(200) NOT NULL,
      employee_password VARCHAR(200) NOT NULL,
      employee_email VARCHAR(200) NOT NULL,
      company_id uuid NOT NULL,
      employee_address VARCHAR(1000) NOT NULL,
      employee_role VARCHAR NOT NULL,
      profile_photo VARCHAR(1000) NOT NULL,
      is_varified BOOL NOT NULL DEFAULT FALSE,
      CONSTRAINT employee_pkey PRIMARY KEY (id ASC),
      UNIQUE INDEX employee_email_key (employee_email ASC),
      UNIQUE INDEX employee_id_key (id ASC)
    )`
    );
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("employee_table");
  },
};
