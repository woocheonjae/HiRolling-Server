"use strict";

import { QueryInterface, QueryTypes, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    /**
     * personal_post 테이블 변경
     *
     * user_id 컬럼 NULL 허용하게끔 allowNull 값 변경
     */
    await queryInterface.changeColumn("personal_post", "user_id", {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      comment: "Not Null: true -> false",
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("personal_post", "user_id", {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      comment: "Not Null: false -> true",
    });
  },
};
