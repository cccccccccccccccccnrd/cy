"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var express = require("express");
function serve(port) {
    var settings = {
        port: port,
        staticPath: path.join(__dirname, '../public')
    };
    var server = express();
    server.use(express.static(settings.staticPath));
    server.listen(settings.port);
    console.log("http-server serving on port " + settings.port);
    return server;
}
exports.serve = serve;
