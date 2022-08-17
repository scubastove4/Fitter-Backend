'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('feats', 'likes')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('feats', 'likes')
  }
}
