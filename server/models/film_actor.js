const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('film_actor', {
    actor_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    film_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'film_actor',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "film_actor_pkey",
        unique: true,
        fields: [
          { name: "actor_id" },
          { name: "film_id" },
        ]
      },
      {
        name: "idx_fk_films_id",
        fields: [
          { name: "film_id" },
        ]
      },
    ]
  });
};
