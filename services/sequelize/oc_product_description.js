"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("ProductDescription", {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tag: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: "oc_product_description",
    timestamps: false
  });
};
