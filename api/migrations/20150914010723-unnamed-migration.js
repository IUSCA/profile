'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      return queryInterface.addColumn('users', 'somefield', Sequelize.STRING);
    */
    queryInterface.changeColumn('Profiles', 'user_id', Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.changeColumn('Profiles', 'user_id', Sequelize.INTEGER);
  }
};
