'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('comments', 'likes')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('comments', 'likes')
  }
}
