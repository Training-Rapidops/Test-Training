const { Sequelize, fn } = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("token_table", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: fn("gen_random_uuid"),
      },
      employee_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: "employee_table", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      jwt_token: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      expire_time: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      browser: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      device: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      ip_address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP + INTERVAL '5 hours 30 minutes'"
        ),
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP + INTERVAL '5 hours 30 minutes' ON UPDATE CURRENT_TIMESTAMP + INTERVAL '5 hours 30 minutes'"
        ),
      },
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("token_table");
  },
};
