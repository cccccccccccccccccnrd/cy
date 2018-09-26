import * as five from 'johnny-five'

export const board = new five.Board()

interface Devices {
  stepperX: five.Stepper
  stepperY: five.Stepper
  stepperZ: five.Stepper
}

export let devices: Devices

export const topic = 'actor/stepper'

export let state = {
  stepperX: false,
  stepperY: false,
  stepperZ: false,
}

export function init () {
  devices = {
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
  }
}

export function get (device: string) {
  if (device === 'stepperX') return devices.stepperX
  if (device === 'stepperY') return devices.stepperY
  if (device === 'stepperZ') return devices.stepperZ
  else {
    throw Error(`Could not find ${device}`)
  }
}