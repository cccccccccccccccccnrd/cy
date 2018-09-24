const five = require('johnny-five')

const board = new five.Board()

let devices = {}

const topic = 'actor/stepper'
let state = {
  stepperX: false,
  stepperY: false,
  stepperZ: false,
}

function init () {
  devices.stepperX = new five.Stepper({
    type: five.Stepper.TYPE.DRIVER,
    stepsPerRev: 800,
    pins: {
      step: 2,
      dir: 5,
    }
  })
  
  devices.stepperY = new five.Stepper({
    type: five.Stepper.TYPE.DRIVER,
    stepsPerRev: 800,
    pins: {
      step: 3,
      dir: 6,
    }
  })
  
  devices.stepperZ = new five.Stepper({
    type: five.Stepper.TYPE.DRIVER,
    stepsPerRev: 800,
    pins: {
      step: 4,
      dir: 7,
    }
  })
}

function get (device) {
  if (device === 'stepperX') return devices.stepperX
  if (device === 'stepperY') return devices.stepperY
  if (device === 'stepperZ') return devices.stepperZ
  else {
    throw Error(`Could not find ${device}`)
  }
}

module.exports = {
  board,
  devices,
  topic,
  state,
  init,
  get,
}