'use strict'
const Alexa = require('alexa-sdk')

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}

const handlers = {
  'LaunchRequest': function () {
    this.emit('Greetings')
  },
  'HelloWorldIntent': function () {
    this.emit('SayHello')
  },
  'Greetings': function () {
    this.response.speak('Whom would you like me to greet?')
      .listen('I didn\'t catch that, what was the name?')
    this.emit(':responseReady')
  },
  'SayHello': function () {
    if (this.event.request.intent.slots.FirstName.value) {
      this.response.speak(`Hello ${this.event.request.intent.slots.FirstName.value}!`)
    } else {
      this.response.ask('Whom would you like me to greet?')
        .listen('I didn\'t catch that, what was the name?')
    }
    this.emit(':responseReady')
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = 'This is the Hello World Sample Skill. '
    const reprompt = 'Say hello, to hear me speak.'

    this.response.speak(speechOutput).listen(reprompt)
    this.emit(':responseReady')
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak('Goodbye!')
    this.emit(':responseReady')
  },
  'AMAZON.StopIntent': function () {
    this.response.speak('See you later!')
    this.emit(':responseReady')
  }
}
