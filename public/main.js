const xButton = document.querySelector('#stepper-x')
const yButton = document.querySelector('#stepper-y')
const zButton = document.querySelector('#stepper-z')

const topic = 'actor/stepper'
let state = { stepperX: false, stepperY: false, stepperZ: false }

const options = {
  clientId: 'web-client-' + Math.random().toString(16).substr(2, 8)
}

client = mqtt.connect('mqtt://192.168.178.70:1717', options)

client.on('connect', function () {
  console.log('mqtt-client connected as ', options.clientId)
})

xButton.onclick = () => {
  state = { stepperX: true, stepperY: false, stepperZ: false }
  client.publish(topic, JSON.stringify(state))
  console.log(`published ${ JSON.stringify(state) }`)
}

yButton.onclick = () => {
  state = { stepperX: false, stepperY: true, stepperZ: false }
  client.publish(topic, JSON.stringify(state))
  console.log(`published ${ JSON.stringify(state) }`)
}

zButton.onclick = () => {
  state = { stepperX: false, stepperY: false, stepperZ: true }
  client.publish(topic, JSON.stringify(state))
  console.log(`published ${ JSON.stringify(state) }`)
}