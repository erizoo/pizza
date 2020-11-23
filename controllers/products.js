'use strict'

const config = require('config')
const Product = require('../models/product')

module.exports = {
    getProducts: (req, reply) => {
        Product.getProducts().then(([products]) => {
            reply.send({
                data: products
            })
        })
    }

}
