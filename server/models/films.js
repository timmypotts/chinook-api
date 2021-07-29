const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('films', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    release_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    language_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    rental_duration: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 3
    },
    rental_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 4.99
    },
    length: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    replacement_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 19.99
    },
    rating: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "G"
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    special_features: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    fulltext: {
      type: "TSVECTOR",
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'films',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "films_fulltext_idx",
        fields: [
          { name: "fulltext" },
        ]
      },
      {
        name: "films_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_fk_language_id",
        fields: [
          { name: "language_id" },
        ]
      },
      {
        name: "idx_title",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
