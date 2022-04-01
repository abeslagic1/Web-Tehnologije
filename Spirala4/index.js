const sequelize = require("./baza.js");
const express = require("express");
const bodyParser = require('body-parser');

const spirala4Router = express.Router();
const router = express.Router();



spirala4Router.use(bodyParser());

router.use(require("./rute/predmet")(sequelize));
router.use(require("./rute/student")(sequelize));
router.use(require("./rute/dan")(sequelize));
router.use(require("./rute/tip")(sequelize));
router.use(require("./rute/grupa")(sequelize));
router.use(require("./rute/aktivnost")(sequelize));

spirala4Router.use("/v2", router);

module.exports = {
    spirala4Router,
    sequelize
}

