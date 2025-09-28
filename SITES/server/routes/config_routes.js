const siteR = require("./site");


exports.routersInit = (app) => {
    app.use("/sites", siteR);
}
