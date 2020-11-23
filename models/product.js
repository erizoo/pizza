'use strict'

const config = require('config')
const sequelize = require('sequelize')
const decode = require('unescape')
const sanitizeHtml = require('sanitize-html')
const Op = sequelize.Op
const { Product, ProductDescription } = require('../services/sequelize')
const helper = require('../services/helper')

Product.hasOne(ProductDescription, {
    foreignKey: 'product_id'
})

exports.getProducts = function () {
    return new Promise(async function (resolve) {
        Product.findAll({
            where: {
                price: {
                    [Op.gt]: 0
                }
            }
        }).then((result) => {
            resolve([result])
        })
    })
}
