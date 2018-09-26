import * as setup from './config'
import * as http from './http-config'
import * as mqtt from './mqtt-config'

http.serve(1616)
mqtt.serve(1717)

setup.board.on('ready', function () {
  setup.init()

  mqtt.client.on('message', function (topic: any, message: any) {
    if (topic === setup.topic) {
      const state = JSON.parse(message)
      updateSteppers(state)
    }
  })
})

function updateSteppers (state: any) {
  if (state.stepperX) {
    setup.devices.stepperX.step({ steps: 1600, direction: 1 }, () => {
      console.log(`X moved 1600 steps`)
    })
  } else if (state.stepperY) {
    setup.devices.stepperY.step({ steps: 1600, direction: 1 }, () => {
      console.log(`Y moved 1600 steps`)
    })
  } else if (state.stepperZ) {
    setup.devices.stepperZ.step({ steps: 1600, direction: 1 }, () => {
      console.log(`Z moved 1600 steps`)
    })
  } else {
    console.log(`no move`)
  }
}