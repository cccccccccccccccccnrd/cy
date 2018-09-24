const setup = require('./config')
const httpServer = require('./http-server')
const mqttServer = require('./mqtt-server')

httpServer.serve(1616)
mqttServer.serve(1717)

setup.board.on('ready', function () {
  setup.init()

  mqttServer.get('client').on('message', function (topic, message) {
    if (topic === setup.topic) {
      const state = JSON.parse(message)
      updateSteppers(state)
    }
  })
})

function updateSteppers (state) {
  if (state.stepperX) {
    setup.get('stepperX').step({ steps: 1600, direction: 1 }, () => {
      console.log(`X moved 1600 steps`)
    })
  } else if (state.stepperY) {
    setup.get('stepperY').step({ steps: 1600, direction: 1 }, () => {
      console.log(`Y moved 1600 steps`)
    })
  } else if (state.stepperZ) {
    setup.get('stepperZ').step({ steps: 1600, direction: 1 }, () => {
      console.log(`Y moved 1600 steps`)
    })
  } else {
    console.log(`no move`)
  }
}