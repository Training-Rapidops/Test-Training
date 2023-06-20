"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    // const { Sequelize } = require("sequelize");
    console.log("in migration");
    await queryInterface.sequelize.query(
      `CREATE TABLE comapany_table(
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      company_name VARCHAR(200) NOT NULL,
      company_address VARCHAR NOT NULL,
      contect_no VARCHAR NOT NULL,
      contect_email VARCHAR NOT NULL,
      CONSTRAINT company_pkey PRIMARY KEY (id ASC),
      UNIQUE INDEX company_name_key (company_name ASC)
    )`
    );
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("comapany_table");
  },
};
