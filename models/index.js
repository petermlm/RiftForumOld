"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";

const config = require("../libs/config");

const sequelize = new Sequelize(
    config["database"]["database"],
    config["database"]["user"],
    config["database"]["password"],
    {
        host: config["database"]["host"],
        port: config["database"]["port"],
        dialect: 'postgres',
        logging: (_msg) => {},
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
