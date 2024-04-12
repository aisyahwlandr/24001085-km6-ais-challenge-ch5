'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cartypes.hasMany(models.car, { foreignKey: "cartype_id" });
    }
  }
  cartypes.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cartypes',
    tableName: 'cartypes',
    paranoid: true, // enable soft delete
  });
  return cartypes;
};