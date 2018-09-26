import * as five from 'johnny-five'
import { Devices, State } from './constants'

export const board = new five.Board()

export let devices: Devices

export const topic = 'actor/stepper'

export let state: State = {
  stepperX: {
    steps: 100,
    direction: 0,
  },
  stepperY: {
    steps: 100,
    direction: 0,
  },
  stepperZ: {
    steps: 100,
    direction: 0,
  },
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