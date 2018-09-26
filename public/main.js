const xButton = document.querySelector('#stepper-x')
const yButton = document.querySelector('#stepper-y')
const zButton = document.querySelector('#stepper-z')

const textarea = document.querySelector('#state')
const stateButton = document.querySelector('#state-button')

const topic = 'actor/stepper'
let state = { stepperX: false, stepperY: false, stepperZ: false }

const options = {
  clientId: 'web-client-' + Math.random().toString(16).substr(2, 8)
}

const client = mqtt.connect('mqtt://192.168.178.70:1717', options)

client.on('connect', function () {
  console.log('mqtt-client connected as ', options.clientId)
})

stateButton.onclick = () => {
  state = textarea.value
  client.publish(topic, state)
  console.log(JSON.stringify(textarea.value))
}

xButton.onclick = () => {
  state = { stepperX: { steps: 100, direction: 0 } }
  client.publish(topic, JSON.stringify(state))
  console.log(`published ${ JSON.stringify(state) }`)
}

yButton.onclick = () => {
  state = { stepperY: { steps: 100, direction: 0 } }
  client.publish(topic, JSON.stringify(state))
  console.log(`published ${ JSON.stringify(state) }`)
}

zButton.onclick = () => {
  state = { stepperZ: { steps: 100, direction: 0 } }
  client.publish(topic, JSON.stringify(state))
  console.log(`published ${ JSON.stringify(state) }`)
}