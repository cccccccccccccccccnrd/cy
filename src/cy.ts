import * as setup from './config'
import * as http from './http-config'
import * as mqtt from './mqtt-config'
import { Devices, State } from './constants'

process.on('warning', e => console.warn(e.stack))

http.serve(1616)
mqtt.serve(1717)

setup.board.on('ready', function () {
  setup.init()

  mqtt.client.on('message', function (topic: any, message: any) {
    if (topic === setup.topic) {
      console.log(message.toString())
      console.log(JSON.parse(message.toString()))
      const state = JSON.parse(message)
      updateSteppers(state)
    }
  })
})

function updateSteppers (state: State) {
  if (state.stepperX) {
    setup.devices.stepperX.step({ steps: state.stepperX.steps, direction: state.stepperX.direction }, () => {
      console.log(`X ${ state.stepperX.steps } ${ state.stepperX.direction }`)
    })
  }
  
  if (state.stepperY) {
    setup.devices.stepperY.step({ steps: state.stepperY.steps, direction: state.stepperY.direction }, () => {
      console.log(`Y ${ state.stepperY.steps } ${ state.stepperY.direction }`)
    })
  }
  
  if (state.stepperZ) {
    setup.devices.stepperZ.step({ steps: state.stepperZ.steps, direction: state.stepperZ.direction }, () => {
      console.log(`Z ${ state.stepperZ.steps } ${ state.stepperZ.direction }`)
    })
  }
  
  else {
    console.log(`no move`)
  }
}