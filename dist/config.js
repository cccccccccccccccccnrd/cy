"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var five = require("johnny-five");
exports.board = new five.Board();
exports.topic = 'actor/stepper';
exports.state = {
    stepperX: false,
    stepperY: false,
    stepperZ: false,
};
function init() {
    exports.devices = {
        stepperX: new five.Stepper({
            type: five.Stepper.TYPE.DRIVER,
            stepsPerRev: 800,
            pins: {
                step: 2,
                dir: 5,
            }
        }),
        stepperY: new five.Stepper({
            type: five.Stepper.TYPE.DRIVER,
            stepsPerRev: 800,
            pins: {
                step: 3,
                dir: 6,
            }
        }),
        stepperZ: new five.Stepper({
            type: five.Stepper.TYPE.DRIVER,
            stepsPerRev: 800,
            pins: {
                step: 4,
                dir: 7,
            }
        }),
    };
}
exports.init = init;
function get(device) {
    if (device === 'stepperX')
        return exports.devices.stepperX;
    if (device === 'stepperY')
        return exports.devices.stepperY;
    if (device === 'stepperZ')
        return exports.devices.stepperZ;
    else {
        throw Error("Could not find " + device);
    }
}
exports.get = get;
