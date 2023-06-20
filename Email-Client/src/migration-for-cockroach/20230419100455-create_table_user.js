"use strict";

/** @type {import('sequelize-cli').Migration} */
async function up({ context: queryInterface }) {
  console.log("=======================================");

  const { Sequelize } = require("sequelize");
  await queryInterface.sequelize.query(
    `CREATE TABLE users( id uuid NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(35) NOT NULL,
    user_email_id VARCHAR(100) NOT NULL,
    picture_path VARCHAR(100000) NOT NULL,
    access_token VARCHAR(1000) NOT NULL,  
    refresh_token VARCHAR(1000) NOT NULL,  
    expires_in VARCHAR NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id ASC),  
    UNIQUE INDEX users_user_email_id_key (user_email_id ASC))`
  );
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("users");
}
module.exports = { up, down };
