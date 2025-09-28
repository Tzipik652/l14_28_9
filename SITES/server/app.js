const express = require("express");
const path = require("path");
const http = require("http");
const {routersInit} = require("./routes/config_routes");
const cors = require("cors");

require("./db/mongoConnect");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

routersInit(app);

const server = http.createServer(app);

let port = process.env.PORT || "3000";
server.listen(port);
