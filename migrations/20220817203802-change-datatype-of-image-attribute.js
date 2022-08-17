'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('feats', 'image', {
      type: Sequelize.BLOB
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('feats', 'image', {
      type: Sequelize.STRING
    })
  }
}
