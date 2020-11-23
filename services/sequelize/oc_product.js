"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("Product", {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    model: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: "oc_product",
    timestamps: false
  });
};
