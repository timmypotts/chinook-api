var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);


  return {
    categories,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
