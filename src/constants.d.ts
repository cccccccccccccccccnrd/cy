import * as five from 'johnny-five'

export interface Devices {
  stepperX: five.Stepper
  stepperY: five.Stepper
  stepperZ: five.Stepper
}

interface StepperState {
  steps: number
  direction: number
}

export interface State {
  stepperX: StepperState
  stepperY: StepperState
  stepperZ: StepperState
}