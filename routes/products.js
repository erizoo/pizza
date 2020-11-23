const productsController = require('../controllers/products');

const routes = [{
        method: 'GET',
        url: '/api/products',
        handler: productsController.getProducts()
    }
]
module.exports = routes
