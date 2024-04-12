'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      car.belongsTo(models.cartypes, { foreignKey: "cartype_id" });
    }
  }
  car.init({
    name: DataTypes.STRING,
    photo: DataTypes.TEXT,
    rentperday: DataTypes.INTEGER,
    cartype_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'car',
    paranoid: true, // enable soft delete
  });
  return car;
};