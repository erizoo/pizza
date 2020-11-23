"use strict";

const config = require("config");
const fastify = require("fastify")();

fastify.register(require("fastify-helmet"));
fastify.register(require("fastify-rate-limit"), {
  max: 100,
  timeWindow: 60 * 1000,
  keyGenerator: function (req) {
    return req.headers["cf-connecting-ip"]
      || req.headers["x-real-ip"]
      || req.headers["x-client-ip"]
      || req.headers["x-forwarded-for"]
      || req.raw.ip;
  }
});
fastify.register(require("fastify-compress"));
fastify.register(require("fastify-jwt"), {
  decode: {
    complete: true
  },
  secret: config.jwt.secret,
  sign: {
    algorithm: config.jwt.algo,
    expiresIn: config.jwt.expire,
    issuer: "kitobz.com"
  },
  verify: {
    algorithms: [config.jwt.algo],
    issuer: "kitobz.com",
    ignoreExpiration: false
  }
});
fastify.register(require("fastify-openapi-generator"), {
  controllers: require("../../controllers"),
  template: "swagger.html",
  redocTemplate: "redoc.html"
});

fastify.setNotFoundHandler((req, reply) => {
  reply.code(404).send({
    ok: false,
    error: "Not Found"
  });
});

fastify.setErrorHandler((error, req, reply) => {
  console.error(error);
  reply.code(error.statusCode).send({
    ok: false,
    error: error.message
  });
});

module.exports = function (port, host, callback) {
  fastify.listen(port, host, (error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    callback(host, port);
  });
};
