const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('film_category', {
    film_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    category_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'film_category',
    schema: 'public',
    timestamps: false
  });
};
