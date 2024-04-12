'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  member.init({
    email: {
      unique: true,
      type: DataTypes.STRING,
    },
    password: DataTypes.TEXT,
    name: DataTypes.STRING,
    photo: DataTypes.TEXT,
    role: DataTypes.ENUM("user", "admin", "superadmin"),
  }, 
  {
    sequelize,
    modelName: 'member',
    paranoid: true,
  });
  return member;
};