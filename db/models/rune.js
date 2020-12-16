'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rune extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Rune.init({
    name: DataTypes.STRING,
    aett: DataTypes.STRING,
    transliteration: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rune',
  });
  return Rune;
};