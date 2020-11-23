"use strict";

const config = require("config");

require("./services/fastify")(config.http.port, config.http.host, (host, port) => {
  console.log("Server listen on " + host + ":" + port);
});
