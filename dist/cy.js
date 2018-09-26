"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setup = require("./config");
var http = require("./http-config");
var mqtt = require("./mqtt-config");
http.serve(1616);
mqtt.serve(1717);
setup.board.on('ready', function () {
    setup.init();
    console.log('lolo');
    mqtt.client.on('message', function (topic, message) {
        console.log('hi');
        if (topic === setup.topic) {
            var state = JSON.parse(message);
            updateSteppers(state);
        }
    });
});
function updateSteppers(state) {
    if (state.stepperX) {
        setup.devices.stepperX.step({ steps: 1600, direction: 1 }, function () {
            console.log("X moved 1600 steps");
        });
    }
    else if (state.stepperY) {
        setup.devices.stepperY.step({ steps: 1600, direction: 1 }, function () {
            console.log("Y moved 1600 steps");
        });
    }
    else if (state.stepperZ) {
        setup.devices.stepperZ.step({ steps: 1600, direction: 1 }, function () {
            console.log("Y moved 1600 steps");
        });
    }
    else {
        console.log("no move");
    }
}
