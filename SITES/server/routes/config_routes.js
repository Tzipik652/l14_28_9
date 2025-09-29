const siteR = require("./site");
const userR = require("./user");
const countriesR = require("./countries");

exports.routersInit = (app) => {
  app.use("/sites", siteR);
  app.use("/users", userR);
  app.use("/countries", countriesR);
};
