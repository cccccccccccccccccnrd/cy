"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mosca = require("mosca");
var mqtt = require("mqtt");
function serve(port) {
    var settings = {
        http: {
            port: port,
            bundle: true,
            static: __dirname
        },
        persistence: {
            factory: mosca.persistence.Memory
        }
    };
    exports.server = new mosca.Server(settings);
    exports.server.on('ready', function () {
        console.log('mqtt-server is running on port', settings.http.port);
    });
    exports.server.on('clientConnected', function (client) {
        console.log(Date.now() + " client connected " + client.id);
    });
    exports.server.on('clientDisconnected', function (client) {
        console.log(Date.now() + " client disconnected " + client.id);
    });
    /* MQTT client setup */
    var clientSettings = {
        clientId: 'broker-client-' + Math.random().toString(16).substr(2, 8),
    };
    exports.client = mqtt.connect('mqtt://127.0.0.1', clientSettings);
    exports.client.on('connect', function () {
        exports.client.subscribe('actor/#');
    });
}
exports.serve = serve;
function get(clientOrServer) {
    if (clientOrServer === 'server')
        return exports.server;
    if (clientOrServer === 'client')
        return exports.client;
    else {
        return new Error("Could not find " + clientOrServer);
    }
}
exports.get = get;
